import { createWaitlist } from "@action";
import { CardWithForm } from "@components/card-with-form";

interface Props {
  searchParams: {
    url: string
  }
}
export default async function CreatePage({ searchParams: { url} }: Props) {
  async function create() {
    "use server"

    await createWaitlist(url)
    console.log('created')
  }

  return (
    <div className="flex flex-col gap-6 lg:gap-12 p-12 overflow-x-hidden">
      <CardWithForm action={create} />
    </div>
  );
}
