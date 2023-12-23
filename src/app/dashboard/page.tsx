import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { findId, logError } from '@action'
import supabase from '@lib/supabase'

import { WaitList } from '@app/types'
import { LogoutButton } from '@components/logout-button'
import { WaitlistCard } from '@components/waitlist-card'

export async function getUserWaitlists(email: string): Promise<WaitList[]> {
  const user_id = await findId(email)
  const { data, error } = await supabase
    .from('waitlists')
    .select('*')
    .eq('user_id', user_id)

  if (error) {
    logError(error)
  }

  return data!
}

export default async function DashboardPage() {
  const session = await getServerSession()
  const email = session?.user?.email!

  if (!session || !session.user) {
    redirect('/sign-in')
  }

  const userlists = await getUserWaitlists(email)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {userlists?.length > 0 ? (
          userlists.map(d => <WaitlistCard key={d.created_at} {...d} />)
        ) : (
          <div>You do not have a list yet!</div>
        )}
      </div>
      <div>This is a protected page for {email}</div>
      <LogoutButton />
    </>
  )
}

