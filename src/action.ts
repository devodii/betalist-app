"use server";

import supabase from "@lib/supabase";
import { getServerSession } from "next-auth";

export async function createTable(name: string) {
  const session = await getServerSession();
  const { data, error } = await supabase.rpc("create_table", {
    name: `${session?.user?.email}_${name}`,
  });

  if (error) {
    console.error(error);
  }

  return data;
}
