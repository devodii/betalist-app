import { logError } from "@action";
import { WaitList } from "@app/types";
import supabase from "@lib/supabase";

async function getInfo(table_name: string): Promise<WaitList[]> {
  const { data, error } = await supabase.from(table_name).select("*");

  if (error) {
    logError(error);
  }
  return data!;
}

interface Props {
  params: {
    name: string;
  };
}

export default async function ActivityPage({ params: { name } }: Props) {
  const waiters = await getInfo(name);
  return (
    <main className="w-screen h-screen flex items-start justify-center">
      {JSON.stringify(waiters)}
      {name}
    </main>
  );
}
