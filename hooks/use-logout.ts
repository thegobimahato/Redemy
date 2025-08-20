"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export function useLogout() {
  const router = useRouter();

  const handleLogout = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed out successfully!");
        },
      },
    });
  };

  return handleLogout;
}
