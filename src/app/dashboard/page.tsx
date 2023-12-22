import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { findId, logError } from "@action";
import supabase from "@lib/supabase";

import { WaitList } from "@app/types";
import { NavBar } from "@components/navbar";
import { WaitlistCard } from "@components/waitlist-card";
import { LoginComponent } from "@components/login-component";

export async function getUserWaitlists(email: string): Promise<WaitList[]> {
  const user_id = await findId(email);
  const { data, error } = await supabase
    .from("waitlists")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    logError(error);
  }

  return data!;
}

export default async function DashboardPage() {
  const session = await getServerSession();
  const email = session?.user?.email!;

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const userlists = await getUserWaitlists(email);

  return (
    <main className="overflow-x-hidden w-full ">
      <NavBar />
      <div className="ml-[300px] w-[calc(100%-300px)] max-w-7xl py-6 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userlists?.length > 0 ? (
            userlists.map((d) => <WaitlistCard key={d.created_at} {...d} />)
          ) : (
            <div>You do not have a list yet!</div>
          )}
        </div>
        <div>This is a protected page for {email}</div>
        <LoginComponent />
      </div>
    </main>
  );
}
