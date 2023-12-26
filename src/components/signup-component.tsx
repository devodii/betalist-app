"use client";

import supabase from "@lib/supabase";
import * as React from "react";
import { useRouter } from "next/navigation";

export function SignUpComponent() {
  const { push } = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const email = formdata.get("email");
    const password = formdata.get("password");
    console.log({ email, password });

    const { data, error } = await supabase
      .from("account")
      .insert({ email, password });

    if (data) {
      push("/app.betalist.com");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen w-screen flex flex-col gap-4 items-center justify-center"
    >
      <input
        placeholder="email"
        name="email"
        className="w-full max-w-4xl border text-black black bg-inherit"
      />
      <input
        placeholder="password"
        name="password"
        className="w-full max-w-4xl border border-black bg-inherit"
      />

      <button type="submit">submit</button>
    </form>
  );
}
