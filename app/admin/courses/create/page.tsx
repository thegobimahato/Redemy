import { Metadata } from "next";

import CourseCreationForm from "../_components/CourseCreationForm";

export const metadata: Metadata = {
  title: "Create Course",
  description: "Add a new course with all details",
};

const CourseCreationPage = () => {
  return (
    <div>
      {/* Client form component */}
      <CourseCreationForm />
    </div>
  );
};

export default CourseCreationPage;
