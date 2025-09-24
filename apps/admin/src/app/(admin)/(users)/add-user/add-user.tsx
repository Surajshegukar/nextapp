"use client";
import ComponentCard from "@/components/common/ComponentCard";
// import DatePicker from "@/components/form/date-picker";
import Input from "@/components/form/input/InputField";

import Label from "@/components/form/Label";
// import Select from "@/components/form/Select";
import { ChevronDownIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FileInput from "@/components/form/input/FileInput";
import TextArea from "@/components/form/input/TextArea";
import dynamic from "next/dynamic";
import Form from "@/components/form/Form";
import { UserFormData, userSchema } from "@/validation/validation";
import FormGroup from "@/components/form/FormGroup";
import instance from "@/utils/axiosInstance";

const Select = dynamic(() => import('@/components/form/Select'), { ssr: false });
const DatePicker = dynamic(() => import('@/components/form/date-picker'), { ssr: false });


export default function AddUserForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      userType: "",
      username: "",
      dob: "",
      email: "",
      password: "",
      address: "",
      image: null,
    },
  });

  const onSubmit = async (data: UserFormData) => {
    setMessage(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image" && value instanceof FileList) {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value as string);
        }
      });
      const res = await instance.post("/api/users", formData);
      const result = await res.data;
      if (!res.data.success) throw new Error(result.message || "Failed to add user");
      setMessage({ type: "success", text: "User added successfully!" });
      reset();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const options = [
    { value: "Admin", label: "Admin" },
    { value: "User", label: "User" },
    { value: "Developer", label: "Developer" },
  ];

  return (
    <ComponentCard title="Add User">
      <Form onSubmit={handleSubmit(onSubmit)}
       className="space-y-4"
        isSubmitting={isSubmitting}
        message={message || undefined}
      >
        {/* First Name */}
        <FormGroup>
          <Label>First Name</Label>
          <Input placeholder="Enter first name" {...register("firstName")}
            error={!!errors.firstName}
            errorMessage={errors.firstName?.message}
            />
          </FormGroup>

          {/* Middle Name */}
          <FormGroup>
            <Label>Middle Name</Label>
            <Input
              placeholder="Enter middle name"
              {...register("middleName")}
              error={!!errors.middleName}
              errorMessage={errors.middleName?.message}
            />
           </FormGroup>

          {/* Last Name */}
          <FormGroup>
            <Label>Last Name</Label>
            <Input placeholder="Enter last name" {...register("lastName")}
            error={!!errors.lastName}
            errorMessage={errors.lastName?.message}
            />
           </FormGroup>

          {/* User Type */}
          <FormGroup>
            <Label>Select User Type</Label>
            <div className="relative">
              <Controller
                name="userType"
                control={control}
                render={({ field }) => (
                  <Select
                    options={options}
                    placeholder="Select an option"
                    onChange={field.onChange}
                    value={field.value}
                    className="dark:bg-dark-900"
                    error={errors.userType}
                    errorMessage={errors.userType?.message as string}
                  />

                )}
              />
             
             </div>
           </FormGroup>

          {/* Username */}
          <FormGroup>
            <Label>Username</Label>
            <Input placeholder="Enter username" {...register("username")}
              error={!!errors.username}
              errorMessage={errors.username?.message}
            />
           
           </FormGroup>

          {/* Date of Birth */}
          <FormGroup>
             <Controller
        name="dob"
        control={control}
        render={({ field }) => (
          <DatePicker
            id="dob"
            label="Select DOB"
            placeholder="Choose your date of birth"
            value={field.value}
            onChange={field.onChange}
            error={errors.dob}
            
          />
        )}
      />
            
           </FormGroup>

          {/* Email */}
          <FormGroup>
            <Label>Email</Label>
            <Input placeholder="Enter email" type="email" {...register("email")}
            error={!!errors.email}
            errorMessage={errors.email?.message}
            />
           
           </FormGroup>

          {/* Password */}
          <FormGroup>
            <Label>Password</Label>
            <div className="relative">
              <Input
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={!!errors.password}
                errorMessage={errors.password?.message}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                )}
              </button>
             </div>
            
           </FormGroup>

          {/* Address */}
          <FormGroup className="md:col-span-2 lg:col-span-3">
            <Label>Address</Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextArea
                  placeholder="Enter full address"
                  rows={3}
                  value={field.value}
                  onChange={field.onChange}
                  name={field.name}
                  error={!!errors.address}
                  errorMessage={errors.address?.message as string}
                />
              )}
            />
           </FormGroup>

          {/* Upload Image */}
          <FormGroup>
            <Label>Upload Image</Label>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <FileInput
                  onChange={(e) => field.onChange(e.target.files)}
                  // FileInput should not spread {...field} because it may include its own onChange
                  error={!!errors.image}
                  errorMessage={errors.image?.message as string}
                />
              )}
            />
         </FormGroup>
      </Form>
    </ComponentCard>
  );
}
