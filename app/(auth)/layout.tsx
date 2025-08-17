import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div
      className={`relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-300 to-gray-100 p-4 dark:[background:radial-gradient(125%_125%_at_50%_90%,#000000_40%,#2b092b_100%)]`}
    >
      {/* Back Button */}
      <Link
        href="/"
        className={`${buttonVariants({ variant: "outline" })} absolute top-4 left-4`}
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      {/* Auth Card Wrapper */}
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center space-y-2">
          <Image
            src="/logo-color.svg"
            alt="Redemy Logo"
            width={40}
            height={40}
          />
          <span className="font-heading text-3xl font-medium">Redemy</span>
        </Link>

        {/* Page Content */}
        {children}

        {/* Terms */}
        <p className="text-muted-foreground text-center text-sm text-balance">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="hover:text-primary transition hover:underline hover:underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="hover:text-primary transition hover:underline hover:underline-offset-4"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
