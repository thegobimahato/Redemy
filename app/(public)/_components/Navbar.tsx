"use client";

import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ThemeToggle from "@/components/ui/theme-toggle";

import { authClient } from "@/lib/auth-client";

import UserDropdown from "./UserDropdown";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="bg-background/90 supports-[backdrop-filter]:bg-background/60 border-border/50 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Redemy Logo"
            width={32}
            height={32}
            priority
          />
          <span className="font-heading text-xl md:text-2xl">Redemy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-primary font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isPending ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          ) : session ? (
            <UserDropdown
              email={session.user.email}
              image={
                session?.user.image ??
                `https://avatar.vercel.sh/${session?.user.email}`
              }
              name={
                session?.user.name && session.user.name.length > 0
                  ? session.user.name
                  : session?.user.email.split("@")[0]
              }
            />
          ) : (
            <Link href="/login" className={buttonVariants()}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
