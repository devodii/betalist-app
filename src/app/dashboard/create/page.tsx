import { FirstSteps } from "@components/first-steps";
import { CreateHeader } from "@components/create-header";

interface Props {
  searchParams: {
    path: string;
  };
}

export default async function CreatePage({ searchParams: { path } }: Props) {
  return (
    <div className="flex flex-col gap-6 lg:gap-12 p-12 overflow-x-hidden">
      <header className="mt-1">
        <CreateHeader />
      </header>
      <main className="flex justify-center mx-auto items-center max-w-[1350px]">
        <div className="flex-[0.5]">
          <FirstSteps />
        </div>
      </main>
    </div>
  );
}
