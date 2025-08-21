import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "All Courses",
  description: "View and manage all courses in the Redemy admin dashboard.",
};

const CoursesPage = () => {
  return (
    <>
      <div className="flex  items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>

        <Link href={"/admin/courses/create"} className={buttonVariants()}>
          Create Course
        </Link>
      </div>

      <div>
        <h1>Here you will see all of the courses</h1>
      </div>
    </>
  );
};

export default CoursesPage;
