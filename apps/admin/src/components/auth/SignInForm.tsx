"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import Form from "../form/Form";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData } from "@/validation/validation";
import { loginSchema } from "@/validation/validation";
import { signInUser } from "@/services/services";



export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { message, setMessage } = useToastMessage();
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData & { remember?: boolean }>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

const onSubmit = async (data: LoginFormData & { remember?: boolean }) => {
  setMessage(null);
  try {
    const response = await signInUser(data);
    setMessage({ type: "success", text: "Login successful!" });
    navigate.push("/");
  } catch (error: any) {
    setMessage({ type: "error", text: error?.response?.data?.message || "Login failed. Please try again." });
  }
  

};


  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>

          <Form
            className="w-full mb-0"
            onSubmit={handleSubmit(onSubmit)}
            submitButtonText="Sign in"
            submitButtonClassName="w-full"
            submitButtonLoadingText="Signing in..."
            formLayout="vertical"
            isSubmitting={isSubmitting}
            message={message || undefined}
          >
            <div className="space-y-6">
              {/* Email */}
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  placeholder="info@gmail.com"
                  type="email"
                  {...register("email")}
                  error={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              </div>

              {/* Password */}
              <div>
                <Label>
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    error={!!errors.password}
                    errorMessage={errors.password?.message}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>
             
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
