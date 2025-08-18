"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signout successfully!");
        },
      },
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-start p-6">
      <h1 className="mb-6 text-3xl font-semibold">Hello Next.js</h1>

      <ThemeToggle />

      {session ? (
        <div className="mt-6 flex flex-col items-start gap-4">
          <p className="text-lg">{session.user.name}</p>
          <Button onClick={signOut} variant="destructive">
            Logout
          </Button>
        </div>
      ) : (
        <Link href="/login">
          <Button className="mt-6">Login</Button>
        </Link>
      )}
    </div>
  );
}
