import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import { Button } from "@shadcn/button";

export const BetalistHero = () => {
  return (
    <form>
      <Label>Launch your first product</Label>
      <Input className="text-black" />
      <Button>create</Button>
    </form>
  );
};
