import { FirstSteps } from "@components/first-steps";
import { Button } from "@shadcn/button";

interface Props {
  searchParams: {
    path: string;
  };
}

export default async function CreatePage({ searchParams: { path } }: Props) {
  return (
    <main className="w-full">
      <FirstSteps />
    </main>
  );
}
