
import { z } from "zod";


export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  userType: z.string().min(1, "Please select a user type"),
  username: z.string().min(1, "Username is required"),
  dob: z.string().nonempty("Date of birth is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().min(5, "Address is required"),
  image: z
    .any()
    .refine((file) => file?.length === 1, "Please upload an image"),
});

export type UserFormData = z.infer<typeof userSchema>;


export const departmentSchema = z.object({
  department_name: z.string().min(1, "Department name is required"),
});
export type DepartmentFormData = z.infer<typeof departmentSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(2, "Password must be at least 2 characters"),
});
export type LoginFormData = z.infer<typeof loginSchema>;


export const categorySchema = z.object({
  category_name: z.string().min(1, "Category name is required"),
});
export type CategoryFormData = z.infer<typeof categorySchema>;

export const magazineSchema = z.object({
  magazine_name: z.string().min(1, "Magazine name is required"),
  category: z.string().min(1, "Please select category name"),
  auther: z.string().min(1, "Please select author name"),
  publish_date: z.string().min(1, "Publish date is required"),
  duration: z.string().min(1, "Duration is required"),
  image: z.any().refine((file) => file?.length === 1, "Please upload an image"),
  short_description: z.string().min(5, "Short description is required"),
  desc: z.string().min(10, "Content must be at least 10 characters"),
});

export type MagazineFormData = z.infer<typeof magazineSchema>;