import { Browser, ChartBar } from "@icons";
import { Button } from "@shadcn/button";
import Link from "next/link";

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
  {
    href: "/dashboard/create/stats",
    icon: ChartBar,
    name: "Stats",
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
  return (
    <nav
      role="navigation"
      className="w-full flex items-center gap-6 bg-dark-secondary py-4 px-8 rounded-lg"
    >
      {menu.map((m, idx) => (
        <LinkComp key={idx} {...m} />
      ))}

      <div className="flex flex-1 items-end justify-end">
        <Button className="self-end" variant={"secondary"}>
          Deploy!
        </Button>
      </div>
    </nav>
  );
}
