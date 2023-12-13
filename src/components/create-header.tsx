"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { Browser } from "@icons";
import { Button } from "@shadcn/button";
import Link from "next/link";
import { createWaitlist } from "@action";

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
  const url = searchParams.get("url")!;
  const isEmailSelected = Boolean(searchParams.get("email")!);

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
          className="self-end"
          variant={"secondary"}
          onClick={() => createWaitlist(url, { email: isEmailSelected })}
        >
          Deploy!
        </Button>
      </div>
    </nav>
  );
}
