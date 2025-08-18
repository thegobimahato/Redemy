import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1).trim(),
    AUTH_GITHUB_CLIENT_ID: z.string().min(1).trim(),
    AUTH_GITHUB_CLIENT_SECRET: z.string().min(1).trim(),
    AUTH_GOOGLE_CLIENT_ID: z.string().min(1).trim(),
    AUTH_GOOGLE_CLIENT_SECRET: z.string().min(1).trim(),
    RESEND_API_KEY: z.string().min(1).trim(),
    ARCJET_KEY: z.string().min(1).trim(),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  },
});
