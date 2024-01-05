import { getUserWaitlists } from '@action'
import { WaitlistCard } from '@components/waitlist-card'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession()
  const email = session?.user?.email!

  if (!session || !session.user) {
    redirect('/dashboard/sign-in')
  }

  const userlists = await getUserWaitlists(email)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {userlists?.length > 0 ? (
        userlists.map(d => <WaitlistCard key={d.created_at} {...d} />)
      ) : (
        <div className="h-[90vh] w-[75vw] flex flex-col items-center justify-center">
          <span>You do not have a list yet!</span>
          <span>Create a page to start collecting emails</span>
        </div>
      )}
    </div>
  )
}

