"use client";

import { BookOpen, Home, LayoutDashboard, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface UserDropdownProps {
  name: string;
  email: string;
  image: string;
}

const UserDropdown = ({ name, email, image }: UserDropdownProps) => {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed out successfully!");
        },
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>
                {name ? name[0].toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64" align="end" sideOffset={8}>
        {/* User Info */}
        <DropdownMenuLabel className="flex flex-col">
          <span className="truncate text-sm font-medium">{name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Main Navigation */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/">
              <Home size={16} className="opacity-60" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/courses">
              <BookOpen size={16} className="opacity-60" />
              <span>Courses</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboard size={16} className="opacity-60" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem onClick={signOut}>
          <LogOut size={16} className="opacity-60" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
