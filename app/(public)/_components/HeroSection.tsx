"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";

const HeroSection = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <section className="relative py-20 sm:py-28">
      <div className="flex flex-col items-center space-y-8 px-4 text-center sm:px-6">
        <Badge variant="outline" className="px-4 py-1 text-sm">
          Learn Without Limits
        </Badge>

        <h1 className="font-body text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Upgrade Your Skills, Anytime, Anywhere
        </h1>

        <p className="text-muted-foreground mx-auto max-w-[700px] text-base sm:text-lg">
          Access high-quality courses taught by industry experts. Whether you
          want to advance your career, switch industries, or just learn
          something new, we&apos;ve got you covered.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link href="/courses" className={buttonVariants({ size: "lg" })}>
            Browse Courses
          </Link>

          {!isPending && !session && (
            <Link
              href="/login"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
