"use client";

import { useTransition } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import GithubIcon from "@/components/icons/github-stroke-rounded";
import GoogleIcon from "@/components/icons/google-stroke-rounded";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { authClient } from "@/lib/auth-client";

// -------------------- Schema --------------------
const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

// -------------------- Component --------------------
const LoginForm = () => {
  const [githubPending, startGithubTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  // -------------------- GitHub Login --------------------
  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with GitHub, redirecting...");
          },
          onError: () => {
            toast.error("Internal server error");
          },
        },
      });
    });
  }

  // -------------------- Google Login --------------------
  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Google, redirecting...");
          },
          onError: () => {
            toast.error("Internal server error");
          },
        },
      });
    });
  }

  // -------------------- Email Login --------------------
  async function signInWithEmail(values: z.infer<typeof formSchema>) {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: values.email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Verification email sent.");

            const encoded = encodeURIComponent(values.email);
            const decoded = values.email;

            router.push(`/verify-request?email=${encoded}`);
            router.replace(`/verify-request?email=${decoded}`, {
              scroll: false,
            });
          },
          onError: () => {
            toast.error("Error sending email");
          },
        },
      });
    });
  }

  // -------------------- UI --------------------
  return (
    <Card className="border-border/50 bg-background/60 relative w-full overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl">
      {/* Glow Accent */}
      <div className="bg-primary/40 absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl" />

      <CardHeader className="space-y-2 text-center">
        <Link href="/" className="mx-auto flex flex-col items-center gap-2">
          <Image src="/logo.svg" alt="Redemy Logo" width={48} height={48} />
        </Link>
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to continue your learning journey
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Social Buttons */}
        <Button
          onClick={signInWithGithub}
          disabled={githubPending}
          variant="outline"
          className="w-full gap-2 rounded-xl"
        >
          {githubPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <GithubIcon />
              Continue with GitHub
            </>
          )}
        </Button>

        <Button
          onClick={signInWithGoogle}
          disabled={googlePending}
          variant="outline"
          className="w-full gap-2 rounded-xl"
        >
          {googlePending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <GoogleIcon />
              Continue with Google
            </>
          )}
        </Button>

        {/* Divider */}
        <div className="relative flex items-center py-2">
          <div className="border-border flex-grow border-t" />
          <span className="bg-background text-muted-foreground px-3 text-xs">
            OR
          </span>
          <div className="border-border flex-grow border-t" />
        </div>

        {/* Email Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(signInWithEmail)}
            className="grid gap-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@gmail.com"
                      {...field}
                      className="rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={emailPending}
              className="w-full rounded-xl"
            >
              {emailPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Continue with Email"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
