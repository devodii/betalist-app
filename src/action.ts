"use server";

import { IVerifyUser, WaitList } from "@app/types";
import supabase from "@lib/supabase";
import { getServerSession } from "next-auth";

export async function findId(email: string) {
  const { data, error } = await supabase
    .from("account")
    .select("id")
    .eq("email", email);

  if (error) {
    console.error(error);
  }

  return data ? data[0] : null;
}

export async function verifyUser(
  email: string,
  password: string
): Promise<IVerifyUser> {
  const { data: user, error } = await supabase
    .from("account")
    .select("*")
    .eq("email", email);

  if (error) {
    console.error("Error fetching user:", error);
  }

  return !user
    ? { status: false, message: "user not found", user: null }
    : user[0].password === password
    ? { message: "", status: true, user: user[0] }
    : { status: false, message: "password is incorrect", user: null };
}

export async function createTable(name: string) {
  const { data, error } = await supabase.rpc("create_table", {
    name,
  });

  if (error) {
    console.error(error);
  }

  return data;
}

export async function createWaitlist(name: string) {
  const session = await getServerSession();
  const email = session?.user?.email;
  const user_id = await findId(email!);
  const table_name = `${session?.user?.email}_${name}`;

  const { data, error } = await supabase
    .from("waitlists")
    .insert({ name, user_id: user_id?.id, table_name });

  if (error) {
    console.log(error);
  }
  console.log({ name });
  console.log({ data });
  console.log({ user_id });

  await createTable(table_name);
}

export async function getUserWaitlists(email: string): Promise<WaitList[]> {
  const user_id = await findId(email);
  const { data, error } = await supabase
    .from("waitlists")
    .select("*")
    .eq("user_id", user_id?.id);

  if (error) {
    console.log("An error occured: ", error);
  }

  return data!;
}
