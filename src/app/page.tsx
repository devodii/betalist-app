import { BetalistHero } from "@components/hero";
import { getServerSession } from "next-auth";

export default async function LandingPage() {
  const session = await getServerSession();
  const isAuthed = session?.user ? true : false;

  return (
    <main className="min-h-screen p-24">
      <BetalistHero />
    </main>
  );
}
