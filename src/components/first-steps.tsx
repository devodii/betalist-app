"use client";

import * as React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Card } from "@shadcn/card";
import { Label } from "@shadcn/label";
import { Input } from "@components/ui/input";
import { Switch } from "@/components/ui/switch";

interface Fields {
  email: boolean;
}

export function FirstSteps() {
  const [fields, setFields] = React.useState<Fields>({
    email: false,
  });

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const path = searchParams.get("url");

  const pathname = usePathname();
  const { replace } = useRouter();

  function handleUpdate(term: string) {
    term ? params.set("url", term) : params.delete("url");
    replace(`${pathname}?${params.toString()}`);
  }

  function handleUpdateFields() {
    setFields((prevFields) => ({ ...prevFields, email: !prevFields.email }));
    !fields.email ? params.set("email", "true") : params.delete("email");
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Card className="bg-[#1A1A17] p-8 border-none flex flex-col gap-4 min-w-[600px]">
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label className="text-white lg:text-lg">Name | URL</Label>
          <Input
            className="flex-1 bg-dark-main text-white text-[20px] font-medium"
            defaultValue={path!}
            onChange={(e) => handleUpdate(e.target.value)}
            placeholder="Product name..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-white lg:text-lg">Fields</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="email-address"
              className="checked:bg-red-500 data-[state=checked]:bg-green-500"
              onClick={handleUpdateFields}
            />
            <Label htmlFor="email-address" className="text-white text-lg">
              Email address
            </Label>
          </div>
        </div>
      </form>
    </Card>
  );
}
