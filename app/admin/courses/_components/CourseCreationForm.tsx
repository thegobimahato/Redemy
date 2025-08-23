"use client";

import { useTransition } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { tryCatch } from "@/hooks/try-catch";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowLeftDashed, IconSparkles } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";

import { Uploader } from "@/components/file-uploader/Uploader";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  CourseSchemaType,
  courseCategories,
  courseLevels,
  courseSchema,
  courseStatus,
} from "@/lib/zodSchemas";

import { CreateCourse } from "../create/action";

const CourseCreationForm = () => {
  const [pending, startTransition] = useTransition();

  const router = useRouter();

  // Setup form with Zod validation
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      fileKey: "",
      price: 0,
      duration: 0,
      level: "Beginner",
      category: "Development",
      status: "Draft",
      slug: "",
      smallDescription: "",
    },
  });

  // Handle form submit
  const onSubmit = (values: CourseSchemaType) => {
    console.log("Submitted values:", values);
    startTransition(async () => {
      const { data: result, error } = await tryCatch(CreateCourse(values));

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
      }

      if (result?.status === "success") {
        toast.success(result?.message);
        form.reset();
        router.push("/admin/courses");
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4 -ml-2">
        <Link
          href="/admin/courses"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "",
          })}
        >
          <IconArrowLeftDashed className="size-4" />
          Back to Courses
        </Link>
      </div>

      <h1 className="text-2xl font-semibold mb-4">Create Course</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Basic Information</CardTitle>
          <CardDescription>
            Provide the basic details about this course
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Slug with generate button */}
              <div className="flex gap-4 items-start justify-center">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Slug" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Auto-generate slug from title */}
                <div className="pt-[22px]">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-fit gap-2 rounded-md border border-dashed border-primary/40  active:scale-[0.97] transition-all duration-200 group"
                    onClick={() => {
                      const titleValue = form.getValues("title");
                      const slug = slugify(titleValue).toLowerCase();
                      form.setValue("slug", slug, { shouldValidate: true });
                    }}
                  >
                    <IconSparkles className="size-4 text-muted-foreground group-hover:text-white" />
                    <span>Generate Slug</span>
                  </Button>
                </div>
              </div>

              {/* Small Description */}
              <FormField
                control={form.control}
                name="smallDescription"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Small Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter small description"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Full Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Thumbnail URL */}
              <FormField
                control={form.control}
                name="fileKey"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Thumbnail Image</FormLabel>
                    <FormControl>
                      <Uploader
                        onChange={field.onChange}
                        value={field.value}
                        fileTypeAccepted="image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category, Level, Duration, Price */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courseCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Level */}
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Course Level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courseLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Duration */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Duration (hours)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter duration"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Course Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseStatus.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button type="submit" disabled={pending}>
                {pending ? (
                  <>
                    <Loader2 className="animate-spin mr-1" />
                    Creating...
                  </>
                ) : (
                  "Create Course"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCreationForm;
