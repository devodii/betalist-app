"use client";

import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { useSearchParams } from "next/navigation";

import { Label } from "@shadcn/label";
import { Button } from "@shadcn/button";
import { Card, CardFooter } from "@shadcn/card";

export function FirstSteps() {
  const searchParams = useSearchParams();
  const path = searchParams.get("url");

  return (
    <Card className="bg-[#1A1A17] p-8 border-none flex flex-col gap-4">
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label className="text-white lg:text-lg">Name | URL</Label>
          <Input
            className="flex-1 bg-dark-main text-white text-[20px] font-semibold"
            defaultValue={path!}
            placeholder="Product name..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-white lg:text-lg">Description</Label>
          <Textarea
            className="w-full text-white text-[18px] bg-dark-main placeholder:opacity-90"
            placeholder="A summer product for students in  New york"
            cols={100}
            rows={10}
          />
        </div>
      </form>

      <CardFooter className="justify-end">
        <Button
          variant={null}
          className="bg-dark-yellow rounded-lg px-6 py-2.5 max-w-[250px] lg:text-[18px] text-black"
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
