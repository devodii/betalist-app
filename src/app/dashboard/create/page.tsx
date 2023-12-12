import { FirstSteps } from "@components/first-steps";
import { Button } from "@shadcn/button";
import { getServerSession } from "next-auth";

interface Props {
  searchParams: {
    path: string;
  };
}

export default async function CreatePage({ searchParams: { path } }: Props) {
  const session = await getServerSession();

  return (
    <main className="min-h-screen w-screen px-24 py-12">
      <header className="w-full flex justify-end">
        <Button className="self-end">Deploy!</Button>
      </header>

      <FirstSteps user={session?.user} />
    </main>
  );
}
