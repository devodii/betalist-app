import * as React from "react";
import { CreateHeader } from "@components/create-header";
import { ReactNode } from "react";

interface Props {
  children: React.ReactNode;
}

export default async function CreateLayout({ children }: Props) {
  return (
    <div className="flex flex-col gap-6 lg:gap-12 p-12 overflow-x-hidden">
      <header className="mt-1">
        <CreateHeader />
      </header>
      <main className="flex justify-center mx-auto items-center max-w-[1350px]">
        <div className="flex-[0.5]">{children}</div>
      </main>
    </div>
  );
}
