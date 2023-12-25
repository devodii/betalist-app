import { CardWithForm } from '@components/card-with-form'
import { getServerSession } from 'next-auth'

interface Props {
  searchParams: {
    url: string
  }
}
export default async function CreatePage({ searchParams: { url } }: Props) {
  const session = await getServerSession()
  const email = session?.user?.email!

  return (
    <div className="flex flex-col gap-6 lg:gap-12 p-12 overflow-x-hidden">
      <CardWithForm email={email} url={url} />
    </div>
  )
}

