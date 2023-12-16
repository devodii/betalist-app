import { FirstSteps } from "@components/first-steps";

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
