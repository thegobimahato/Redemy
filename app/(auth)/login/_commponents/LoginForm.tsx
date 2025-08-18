"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import GithubIcon from "@/components/icons/github-stroke-rounded";
import GoogleIcon from "@/components/icons/google-stroke-rounded";

import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

const LoginForm = () => {
  const [githubPending, startGithubTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  // -------- GitHub Login --------
  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with GitHub, you will be redirected...");
          },
          onError: () => {
            toast.error("Internal server error");
          },
        },
      });
    });
  }

  // -------- Google Login --------
  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Google, you will be redirected...");
          },
          onError: () => {
            toast.error("Internal server error");
          },
        },
      });
    });
  }

  // -------- Email Login --------
  async function signInWithEmail(values: z.infer<typeof formSchema>) {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: values.email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Verification email sent.");
            router.push(
              `/verify-request?email=${encodeURIComponent(values.email)}`,
            );
          },
          onError: () => {
            toast.error("Error sending email");
          },
        },
      });
    });
  }

  return (
    <>
      <Card className="mx-auto w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Welcome Back!</CardTitle>
          <CardDescription>
            Sign in to continue your learning journey
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {/* Social Logins */}
          <Button
            onClick={signInWithGithub}
            disabled={githubPending}
            variant="outline"
            className="w-full gap-2"
          >
            {githubPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <GithubIcon />
                Sign in with GitHub
              </>
            )}
          </Button>

          <Button
            onClick={signInWithGoogle}
            disabled={googlePending}
            variant="outline"
            className="w-full gap-2"
          >
            {googlePending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <GoogleIcon />
                Sign in with Google
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="border-border flex-grow border-t" />
            <span className="bg-card text-muted-foreground px-3 text-sm">
              Or continue with
            </span>
            <div className="border-border flex-grow border-t" />
          </div>

          {/* Email Login */}
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={emailPending} className="w-full">
                {emailPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <span>Continue with Email</span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

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
    </>
  );
};

export default LoginForm;
