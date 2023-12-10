"use client";

import { signIn, signOut, useSession } from "next-auth/react";

interface Props {
  path?: string;
}

export const LoginButton = ({ path }: Props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button
        className="border px-4 py-2 rounded-md"
        onClick={() =>
          signIn("google", {
            callbackUrl: path ? `/dashboard/create?url=${path}` : "/dashboard",
          })
        }
      >
        Login with Google
      </button>
    );
  } else {
    return (
      <button className="border px-4 py-2 rounded-md" onClick={() => signOut()}>
        Sign Out
      </button>
    );
  }
};
