import { createWaitlist } from '@action'
import { CreateWaitListForm } from '@components/create-waitlist'
import { Error } from '@components/error'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface Props {
  searchParams: {
    url: string
  }
}

// Todo: Add error message
export default async function CreatePage({ searchParams }: Props) {
  const session = await getServerSession()

  // let error_message = ''

  async function create(formdata: FormData) {
    'use server'
    const name = formdata.get('name')

    if (!name) return

    const { error_occured, error_msg } = await createWaitlist(
      session?.user?.email!,
      searchParams.url
    )

    if (error_occured) {
      // error_message = error_msg
      console.log(`Error: ${error_msg}`)
    } else {
      revalidatePath('/dashboard')
      redirect('/dashboard')
    }
  }

  return (
    <>
      <CreateWaitListForm action={create} />
      {/* {error_message! && <Error description={error_message}>Show</Error>} */}
    </>
  )
}

