"use client";

import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export const LoginButton = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button
        className="border px-4 py-2 rounded-md"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
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
