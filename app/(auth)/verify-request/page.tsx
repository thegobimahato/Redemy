import EmailVerifyForm from "../login/_commponents/EmailVerifyForm";

export const metadata = {
  title: "Verify Your Email",
  description: "Enter the code sent to your email to verify your account.",
};

const EmailVerifyPage = () => {
  return <EmailVerifyForm />;
};

export default EmailVerifyPage;
