import { BarChart3, BookOpen, MonitorPlay, Users2 } from "lucide-react";

export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export const features: FeatureProps[] = [
  {
    title: "Expert-Led Courses",
    description:
      "Learn from top instructors and industry professionals with years of real-world experience.",
    icon: BookOpen,
  },
  {
    title: "Hands-On Learning",
    description:
      "Practice with interactive lessons, quizzes, and real projects to apply your knowledge instantly.",
    icon: MonitorPlay,
  },
  {
    title: "Track Your Growth",
    description:
      "Stay motivated with progress tracking, achievements, and personalized learning paths.",
    icon: BarChart3,
  },
  {
    title: "Join the Community",
    description:
      "Connect with learners worldwide, ask questions, and collaborate on projects together.",
    icon: Users2,
  },
];
