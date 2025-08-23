import Link from "next/link";

import { IconArrowLeftDashed } from "@tabler/icons-react";
import { ShieldX } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotAdminRoute() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center space-y-4">
          <div className="bg-destructive/10 rounded-full p-4 w-fit mx-auto">
            <ShieldX className="size-16 text-destructive" />
          </div>

          <CardTitle className="text-2xl">Admin Access Required</CardTitle>
          <CardDescription className="text-lg px-4">
            You don&apos;t have permission to access this page. Only admins can
            create courses.
          </CardDescription>

          <CardContent>
            <Link
              href="/"
              className={buttonVariants({
                variant: "ghost",
                className: "flex items-center gap-2",
              })}
            >
              <IconArrowLeftDashed className="size-4" />
              Return to Courses
            </Link>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
