import { Button } from "@shadcn/button";

export function NavBar() {
  return (
    <nav className="bg-dark-main z-10 fixed left-0 border-r border-grayish min-w-[300px] min-h-screen py-24 px-4">
      <Button className="w-full text-xl py-6">My waitlists</Button>
    </nav>
  );
}
