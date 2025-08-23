"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { CourseSchemaType, courseSchema } from "@/lib/zodSchemas";

export async function CreateCourse(
  values: CourseSchemaType,
): Promise<ApiResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return {
      status: "error",
      message: "Unauthorized",
    };
  }

  try {
    const validation = courseSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid form",
      };
    }

    const course = await prisma.course.create({
      data: {
        ...validation.data,
        userId: session.user.id,
      },
    });

    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch (error) {
    console.error("Failed to create course:", error);

    return {
      status: "error",
      message: "Failed to create course",
    };
  }
}
