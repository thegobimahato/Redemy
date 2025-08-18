import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";

import prisma from "./db";
import { env } from "./env";
import { resend } from "./resend";

import { EmailTemplate } from "@/app/(auth)/login/_commponents/EmailTemplate";

// ------- Auth Config --------
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
    },
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        // Extract firstName from email (before @, capitalize)
        const firstName = email
          .split("@")[0]
          .split(".")[0]
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase());

        await resend.emails.send({
          from: "Redemy <onboarding@resend.dev>",
          to: [email],
          subject: "Redemy | Verify your email",
          react: EmailTemplate({ firstName, otp }),
        });
      },
    }),
  ],
});
