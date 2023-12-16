import { LoginButton } from "@/components/login-button";
import { createTable } from "@action";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  // const test = await createTable('tarotmaster');
  return (
    <main>
      {/* <pre>{JSON.stringify(test, null, 2)}</pre> */}
      <div>This is a protected page, {session.user.email}</div>
      <LoginButton />
    </main>
  );
}
