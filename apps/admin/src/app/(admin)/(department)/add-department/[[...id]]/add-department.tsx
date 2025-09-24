"use client";
import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";

import Label from "@/components/form/Label";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/form/Form";
import FormGroup from "@/components/form/FormGroup";
import { DepartmentFormData, departmentSchema } from "@/validation/validation";
import {  getDepartmentById, submitDepartment, uniqueDepartment } from "@/services/services";
import { useFetchById } from "@/hooks/useFetchById";
import { useParams, useRouter } from "next/navigation";
import { useUniqueCheck } from "@/hooks/useUniqueCheck";
import toast from "react-hot-toast";
import { useToastMessage } from "@/hooks/useToastMessage";
 



export default function AddDepartmentForm() {
  const id = useParams().id as number | undefined;
    const { message, setMessage } = useToastMessage();

  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      department_name: "",
    },
  });

  // Memoize the setter so its reference doesn't change on every render
  const setFormData = useCallback((data: any) => {
    reset({
      department_name: data?.department_name || "",
    });
  }, [reset]);

  // Pass a stable service function (not inline arrow)
  const fetchService = useCallback(async (id: string) => {
    const res = await getDepartmentById(Number(id));
    return res.data.data;
  }, []);

  useFetchById({
    fetchService,
    setFormData,
    onError: (err) => console.error(err),
  });

  const { isUnique, error, checkUnique } = useUniqueCheck(uniqueDepartment, 800);

const departmentName = watch("department_name");

useEffect(() => {
  checkUnique(departmentName , id ? Number(id) : undefined);
}, [departmentName,
    id ? Number(id) : undefined,
   , checkUnique]);

  const onSubmit = async (data: DepartmentFormData) => {

    if (isUnique === false) {
      setMessage({ type: "error", text: "Department name must be unique." });
      return;
    }

    setMessage(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const res = await submitDepartment(id,formData);
      const result = await res.data;
      if (!res.data.success) throw new Error(result.message || "Failed to add department");
      setMessage({ type: "success", text: "Department added successfully!" });
      toast.success("Department added successfully!");
      
      reset({
        department_name: "",
      });
      // navigate.push("/department-list");
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <ComponentCard title="Add Department">
      <Form onSubmit={handleSubmit(onSubmit)}
       className="space-y-4"
        isSubmitting={isSubmitting}
        message={message || undefined}
      >
        {/* Department Name */}
        <FormGroup>
          <Label>Department Name</Label>
          <Input placeholder="Enter department name" {...register("department_name")}
           error={!!errors.department_name || isUnique === false}
            unique={isUnique === true && !errors.department_name}
            errorMessage={
              errors.department_name?.message ||
              (isUnique === false ? "Department already exists" : undefined) ||
              (error ? "Error checking uniqueness" : undefined)

            }
            hint="e.g., Human Resources"
            />
        </FormGroup>

      </Form>
    </ComponentCard>
  );
}
