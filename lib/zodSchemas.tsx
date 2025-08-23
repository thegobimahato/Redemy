import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;
export const courseCategories = [
  "Development",
  "Business",
  "Finance",
  "IT & Software",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
  "Photography",
  "Lifestyle",
  "Language Learning",
  "Science & Engineering",
  "Data Science",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(2000, { message: "Description cannot exceed 2000 characters" }),

  fileKey: z.string().min(1, { message: "File is required" }),

  price: z.coerce
    .number<number>()
    .min(1, { message: "Price must be at least 1" }),

  duration: z.coerce
    .number<number>()
    .min(1, { message: "Duration must be at least 1 hour" })
    .max(500, { message: "Duration cannot exceed 500 hours" }),

  level: z.enum(courseLevels, {
    message:
      "Please select a valid course level (Beginner, Intermediate, Advanced)",
  }),

  category: z.enum(courseCategories, {
    message: "Please select a valid category.",
  }),

  smallDescription: z
    .string()
    .min(10, { message: "Short description must be at least 10 characters" })
    .max(200, { message: "Short description cannot exceed 200 characters" }),

  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must be lowercase and URL-friendly (use hyphens for spaces)",
    }),

  status: z.enum(courseStatus, {
    message: "Please select a valid status (Draft, Published, Archived)",
  }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, { message: "Filename is required" }),
  contentType: z.string().min(1, { message: "Content type is required" }),
  size: z.number().min(1, { message: "Size is required" }),
  isImage: z.boolean(),
});
