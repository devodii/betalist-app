import { LoginButton } from "@/components/login-button";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  return (
    <main>
      <div>This is a protected page, {session.user.email}</div>
      <LoginButton />
    </main>
  );
}
