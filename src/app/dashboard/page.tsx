import { getUserWaitlists } from '@action'
import { WaitlistCard } from '@components/waitlist-card'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession()
  const email = session?.user?.email!

  if (!session || !session.user) {
    redirect('/sign-in')
  }

  const userlists = await getUserWaitlists(email)

  return (
    <div className="bg-red-500 flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {userlists?.length > 0 ? (
          userlists.map(list => (
            <WaitlistCard key={list.created_at} {...list} />
          ))
        ) : (
          <div className="w-[75vw] flex flex-col items-center justify-center">
            <span>You do not have a list yet!</span>
            <span>Create a page to start collecting emails</span>
          </div>
        )}
      </div>
    </div>
  )
}

