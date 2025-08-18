import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import LoginForm from "./_commponents/LoginForm";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login",
  description: "Log in to your Redemy account securely.",
};

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/");
  }

  return <LoginForm />;
};

export default LoginPage;
