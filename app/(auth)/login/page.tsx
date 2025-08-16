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

const LoginPage = () => {
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
        <Button variant="outline" className="w-full gap-2">
          <GithubIcon />
          Sign in with GitHub
        </Button>

        <Button variant="outline" className="w-full gap-2">
          <GoogleIcon />
          Sign in with Google
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

export default LoginPage;
