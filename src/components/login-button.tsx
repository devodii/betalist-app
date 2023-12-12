"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Input } from "./ui/input";
import { useState } from "react";

interface Props {
  path?: string;
}

export const LoginButton = ({ path }: Props) => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    signIn("credentials", {
      email,
      callbackUrl: path ? `/dashboard/create?url=${path}` : "/dashboard",
    });
  }

  if (!session) {
    return (
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto flex min-h-screen justify-center items-center w-screen flex-col gap-4"
      >
        <Input
          placeholder="johndoe@gmail.com"
          className="text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="border px-4 py-2 rounded-md">Login</button>
      </form>
    );
  } else {
    return (
      <button className="border px-4 py-2 rounded-md" onClick={() => signOut()}>
        Sign Out
      </button>
    );
  }
};
