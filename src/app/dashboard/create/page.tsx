import { CreateWaitListForm } from '@components/create-waitlist'
import { getServerSession } from 'next-auth'

interface Props {
  searchParams: {
    url: string
  }
}

export default async function CreatePage({ searchParams }: Props) {
  const session = await getServerSession()
  return (
    <CreateWaitListForm email={session?.user?.email!} url={searchParams.url} />
  )
}

