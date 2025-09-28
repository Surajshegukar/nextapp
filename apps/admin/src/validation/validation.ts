
import { email, z } from "zod";


export const userSchema = (id?: number) =>
    z.object({

  full_name: z.string().min(1, "First name is required"),
  short_description: z.string().min(1, "Short description is required"),
  description: z.string().min(1, "Description is required"),
  email: z.email("Invalid email address"),
  job: z.string().min(1, "Job is required"),
  city: z.string().min(1, "City is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  image: id
      ? z.any().optional()
      : z
          .any()
          .refine((file) => file?.length === 1, "Please upload an image"),
});
export type UserFormData = z.infer<ReturnType<typeof userSchema>>;


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

export const magazineSchema = (id?: number) =>
  z.object({
    magazine_name: z.string().min(1, "Magazine name is required"),
    category_id: z
      .number()
      .int()
      .min(1, "Please select a valid category"),

    auther_id: z   
    .number()
    .int().min(1, "Please select author name"),
    
    publish_date: z.string().min(1, "Publish date is required"),
    duration: z.string().min(1,"Duration is required"),
    image: id
      ? z.any().optional() // when editing, image is optional
      : z
          .any()
          .refine((file) => file?.length === 1, "Please upload an image"), // when creating, image required
    short_description: z.string().min(5, "Short description is required"),
    description: z.string().min(10, "Content must be at least 10 characters"),
  });

export type MagazineFormData = z.infer<ReturnType<typeof magazineSchema>>;


export const podcastSchema = (id?: number) =>
  z.object({
    podcast_name: z.string().min(1, "Podcast name is required"),
    publish_date: z.string().min(1, "Publish date is required"),
    duration: z.string().min(1,"Duration is required"),
    image: id
      ? z.any().optional() // when editing, image is optional
      : z
          .any()
          .refine((file) => file?.length === 1, "Please upload an image"), // when creating, image required
    description: z.string().min(10, "Content must be at least 10 characters"),
  });

export type PodcastFormData = z.infer<ReturnType<typeof podcastSchema>>;