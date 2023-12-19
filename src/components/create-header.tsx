"use client";

import Link from "next/link";
import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { createTable } from "@action";
import { Button } from "@shadcn/button";
import { Browser, Spinner } from "@icons";

interface Menu {
  href: string;
  icon: any;
  name: string;
}

const menu: Menu[] = [
  {
    href: "/dashboard/create",
    icon: Browser,
    name: "Page",
  },
];

function LinkComp(props: Menu) {
  return (
    <Link href={props.href}>
      <Button className="flex items-center gap-3 px-4 py-2" variant={null}>
        {<props.icon size={32} />}
        <span>{props.name}</span>
      </Button>
    </Link>
  );
}

export function CreateHeader() {
  const searchParams = useSearchParams();
  const name = searchParams.get("url")!;

  const { push } = useRouter();

  // TODO: Use later!
  // const isEmailSelected = Boolean(searchParams.get("email")!);

  const [isCreating, setIsCreating] = React.useState<boolean>(false);

  return (
    <nav
      role="navigation"
      className="w-full flex items-center gap-6 bg-dark-secondary py-4 px-8 rounded-lg"
    >
      {menu.map((m, idx) => (
        <LinkComp key={idx} {...m} />
      ))}

      <div className="flex flex-1 items-end justify-end">
        <Button
          className="flex items-center gap-1 self-end"
          variant={"secondary"}
          disabled={isCreating}
          onClick={() => {
            setIsCreating(true);
            setTimeout(async () => {
              await createTable(name);
              setIsCreating(false);
              push("/dashboard");
            }, 4000);
          }}
        >
          <span>Deploy!</span>
          {isCreating && <Spinner size={24} className="animate-spin" />}
        </Button>
      </div>
    </nav>
  );
}
