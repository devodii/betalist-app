"use server";

import supabase from "@lib/supabase";

async function createUser(email: string) {
  const { data } = await supabase.from("users").insert({ email });
  return data;
}

export async function verifyUser(email: string) {
  const { data } = await supabase
    .from("users")
    .select("email")
    .match({ email }); // finds a user by email

  // create a new user if not exists!
  if (!data) {
    await createUser(email);
  }
}
