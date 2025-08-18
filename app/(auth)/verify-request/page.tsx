"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { authClient } from "@/lib/auth-client";

const VerifyRequest = () => {
  const [otp, setOtp] = useState("");
  const [otpPending, startTransition] = useTransition();

  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") as string;

  const isOtpCompleted = otp.length === 6;

  function verifyOtp() {
    startTransition(async () => {
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
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email</CardTitle>
        <CardDescription>
          We have sent a verification code to your email address. Please open
          the email and paste the code below.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            maxLength={6}
            className="gap-2"
            value={otp}
            onChange={setOtp}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <p className="text-muted-foreground text-sm">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <Button
          onClick={verifyOtp}
          disabled={otpPending || !isOtpCompleted}
          className="w-full"
        >
          {otpPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Verify Account"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerifyRequest;
