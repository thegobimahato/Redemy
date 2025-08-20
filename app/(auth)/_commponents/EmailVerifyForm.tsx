"use client";

import { useState, useTransition } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { authClient } from "@/lib/auth-client";

const EmailVerifyForm = () => {
  const [otp, setOtp] = useState("");
  const [otpPending, startOtpTransition] = useTransition();
  const [resendPending, startResendTransition] = useTransition();

  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") as string;

  const isOtpCompleted = otp.length === 6;

  // Verify OTP
  const verifyOtp = () => {
    startOtpTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email verified");
            router.push("/");
          },
          onError: () => {
            toast.error("Error verifying email/OTP");
          },
        },
      });
    });
  };

  // Resend OTP
  const resendOtp = () => {
    startResendTransition(async () => {
      try {
        await authClient.emailOtp.sendVerificationOtp({
          email,
          type: "sign-in",
        });
        toast.success("Verification code resent");
      } catch (err) {
        toast.error("Failed to resend code. Please try again.");
        console.log("Error in resend code", err);
      }
    });
  };

  return (
    <Card className="border-border/50 bg-background/60 relative w-full max-w-md overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl">
      {/* Glow Accent */}
      <div className="bg-primary/40 absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl" />

      <CardHeader className="space-y-3 text-center">
        {/* Logo */}
        <Link href="/" className="mx-auto flex flex-col items-center gap-2">
          <Image src="/logo.svg" alt="Redemy Logo" width={48} height={48} />
        </Link>

        {/* Title */}
        <CardTitle className="text-2xl font-bold tracking-tight">
          Verify your email
        </CardTitle>

        {/* Description */}
        <CardDescription className="text-muted-foreground text-[15px] text-balance">
          We&apos;ve sent a 6-digit code to your email:
          <span className="text-foreground mt-1 block font-medium">
            {email}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* OTP Input */}
        <div className="flex flex-col items-center gap-4">
          <InputOTP
            maxLength={6}
            className="gap-3"
            value={otp}
            onChange={setOtp}
          >
            <InputOTPGroup>
              {[0, 1, 2].map((i) => (
                <InputOTPSlot key={i} index={i} aria-label={`Digit ${i + 1}`} />
              ))}
            </InputOTPGroup>
            <InputOTPGroup>
              {[3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} aria-label={`Digit ${i + 1}`} />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {/* Resend Link */}
          <p className="text-muted-foreground flex items-center gap-2 text-sm">
            Didn&apos;t get the code?{" "}
            <button
              type="button"
              onClick={resendOtp}
              disabled={resendPending}
              className="text-primary flex items-center gap-1 font-medium underline-offset-4 hover:underline"
            >
              {resendPending ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                "Resend"
              )}
            </button>
          </p>
        </div>

        {/* Verify Button */}
        <Button
          onClick={verifyOtp}
          disabled={otpPending || !isOtpCompleted}
          className="w-full"
          size="lg"
        >
          {otpPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Verify Email"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmailVerifyForm;
