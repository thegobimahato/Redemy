"use client";

import Link from "next/link";

import { useLogout } from "@/hooks/use-logout";
import {
  IconDashboard,
  IconDeviceTv,
  IconDotsVertical,
  IconLogout,
  IconSmartHome,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { authClient } from "@/lib/auth-client";

export function NavUser() {
  const { data: session, isPending } = authClient.useSession();
  const handleLogout = useLogout();

  const { isMobile } = useSidebar();

  if (isPending) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="animate-pulse">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="bg-muted rounded-lg" />
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="bg-muted h-4 w-24 rounded"></span>
              <span className="bg-muted mt-1 h-3 w-32 rounded"></span>
            </div>
            <IconDotsVertical className="ml-auto size-4 opacity-10" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={
                    session?.user.image ??
                    `https://avatar.vercel.sh/${session?.user.email}`
                  }
                  alt={session?.user.name}
                />
                <AvatarFallback className="rounded-lg">
                  {session?.user.name && session.user.name.length > 0
                    ? session.user.name.charAt(0).toUpperCase()
                    : session?.user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {session?.user.name && session?.user.name.length > 0
                    ? session?.user.name
                    : session?.user.email.split("@")[0]}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {session?.user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={
                      session?.user.image ??
                      `https://avatar.vercel.sh/${session?.user.email}`
                    }
                    alt={session?.user.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {session?.user.name && session.user.name.length > 0
                      ? session.user.name.charAt(0).toUpperCase()
                      : session?.user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session?.user.name && session?.user.name.length > 0
                      ? session?.user.name
                      : session?.user.email.split("@")[0]}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {session?.user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={"/"}>
                  <IconSmartHome />
                  Home
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={"/admin"}>
                  <IconDashboard />
                  Dashboard
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={"/courses"}>
                  <IconDeviceTv />
                  Courses
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
