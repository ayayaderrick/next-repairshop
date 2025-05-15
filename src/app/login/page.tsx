import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

const LoginPage = () => {
  return (
    <main>
      <div className="h-dvh flex flex-col items-center justify-center gap-6 text-4xl p-4">
        <h1>TechFix Repair Shop</h1>
        <Button asChild>
          <LoginLink>Sign In</LoginLink>
        </Button>
      </div>
    </main>
  );
};

export default LoginPage;
