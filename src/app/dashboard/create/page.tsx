import { createWaitlist, waitlistCount } from '@action'
import { CreateWaitListForm } from '@components/create-waitlist'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getLifetimeStatus } from '../action'

interface Props {
  searchParams: {
    url: string
  }
}

export default async function CreatePage({ searchParams }: Props) {
  const session = await getServerSession()
  const email = session?.user?.email!

  const waitlists = await waitlistCount(email)
  const isPro = await getLifetimeStatus(email)

  async function create(formdata: FormData) {
    'use server'
    const name = formdata.get('name')
    let error_message: string | null = null

    if (!name) return

    const { error_occured, error_msg } = await createWaitlist(
      email,
      searchParams.url
    )

    if (error_occured) {
      error_message = error_msg
      console.log(`Error: ${error_msg}`)
    } else {
      revalidatePath('/dashboard')
      redirect('/dashboard')
    }

    return error_message ?? null
  }

  // ability to create 2 waitlists for free (starts count from 0)
  const isAllowed: boolean = isPro || (!isPro && waitlists <= 1)

  return <CreateWaitListForm action={create} onlyIf={isAllowed} />
}

