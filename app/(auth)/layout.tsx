import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-300">
      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(118,85,247,0.15), transparent 70%), #f8fafc",
        }}
      />

      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226,232,240,0.15), transparent 70%), #000000",
        }}
      />

      {/* Back Button */}
      <Link
        href="/"
        className={`${buttonVariants({
          variant: "outline",
        })} absolute top-4 left-4 z-10 inline-flex items-center gap-2`}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      {/* Auth Card */}
      <div className="relative flex min-h-svh w-full items-center justify-center md:p-8">
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
