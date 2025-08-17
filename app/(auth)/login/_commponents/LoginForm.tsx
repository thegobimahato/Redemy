"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import GoogleIcon from "@/components/icons/google-stroke-rounded";
import GithubIcon from "@/components/icons/github-stroke-rounded";

import { authClient } from "@/lib/auth-client";

const LoginForm = () => {
  const [githubPending, startGithubTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();

  async function SignInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Github, you will be redirected...");
          },
          onError: () => {
            toast.error("Internal server error");
          },
        },
      });
    });
  }

  async function SignInWithGoogle() {
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

  return (
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
          onClick={SignInWithGithub}
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
          onClick={SignInWithGoogle}
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
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john.doe@gmail.com" />
          </div>

          <Button className="w-full">Sign in with Email</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
