import { WaitList } from "@app/types";
import { Card, CardContent, CardFooter, CardTitle } from "@shadcn/card";
import NextLink from "next/link";

interface WaitListCardProps {
  name: WaitList["name"];
  created_at: WaitList["created_at"];
}

export function WaitlistCard(props: WaitListCardProps) {
  return (
    <NextLink href={`/dashboard/stats/${props.name}`}>
      <Card className="bg-inherit border-grayish text-white opacity-80 min-h-[200px]">
        <CardFooter>
          <CardTitle>{props.name}</CardTitle>
          <CardContent>
            <span>{props.created_at as any}</span>
          </CardContent>
        </CardFooter>
      </Card>
    </NextLink>
  );
}
