"use client";
import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";

import Label from "@/components/form/Label";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/form/Form";
import FormGroup from "@/components/form/FormGroup";
import { CategoryFormData, categorySchema } from "@/validation/validation";
import {  getCategoryById, submitCategory, uniqueCategory } from "@/services/services";
import { useFetchById } from "@/hooks/useFetchById";
import { useParams, useRouter } from "next/navigation";
import { useUniqueCheck } from "@/hooks/useUniqueCheck";
import toast from "react-hot-toast";
import { useToastMessage } from "@/hooks/useToastMessage";
 



export default function AddCategoryForm() {
  const id = useParams().id as number | undefined;
    const { message, setMessage } = useToastMessage();

  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name: "",
    },
  });

  // Memoize the setter so its reference doesn't change on every render
  const setFormData = useCallback((data: any) => {
    reset({
      category_name: data?.category_name || "",
    });
  }, [reset]);

  // Pass a stable service function (not inline arrow)
  const fetchService = useCallback(async (id: string) => {
    const res = await getCategoryById(Number(id));
    return res.data.data;
  }, []);

  useFetchById({
    fetchService,
    setFormData,
    onError: (err) => console.error(err),
  });

  const { isUnique, error, checkUnique } = useUniqueCheck(uniqueCategory, 800);

const categoryName = watch("category_name");

useEffect(() => {
  checkUnique(categoryName , id ? Number(id) : undefined);
}, [categoryName,
    id ? Number(id) : undefined,
   , checkUnique]);

  const onSubmit = async (data: CategoryFormData) => {

    if (isUnique === false) {
      setMessage({ type: "error", text: "Category name must be unique." });
      return;
    }

    setMessage(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const res = await submitCategory(id,formData);
      const result = await res.data;
      if (!res.data.success) throw new Error(result.message || "Failed to add category");
      setMessage({ type: "success", text: "Category added successfully!" });
      toast.success("Category added successfully!");
      
      reset({
        category_name: "",
      });
      // navigate.push("/category-list");
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <ComponentCard title="Add Category">
      <Form onSubmit={handleSubmit(onSubmit)}
       className="space-y-4"
        isSubmitting={isSubmitting}
        message={message || undefined}
      >
        {/* Category Name */}
        <FormGroup>
          <Label>Category Name</Label>
          <Input placeholder="Enter category name" {...register("category_name")}
           error={!!errors.category_name || isUnique === false}
            unique={isUnique === true && !errors.category_name}
            errorMessage={
              errors.category_name?.message ||
              (isUnique === false ? "Category already exists" : undefined) ||
              (error ? "Error checking uniqueness" : undefined)

            }
            hint="e.g., Human Resources"
            />
        </FormGroup>

      </Form>
    </ComponentCard>
  );
}
