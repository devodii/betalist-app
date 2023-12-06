import { LoginButton } from "@/components/login-button";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await getServerSession();

  if (user?.user) {
    redirect("/dashboard");
  }

  return <LoginButton />;
}
