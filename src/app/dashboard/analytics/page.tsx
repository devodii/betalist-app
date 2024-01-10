import {
  deleteTable,
  getWaitlist,
  logError,
  removeFromGeneralWaitlist
} from '@action'
import { DeleteDialog } from '@components/delete-waitlist'
import { Feedback } from '@components/feedback'
import { WaitersList } from '@components/waiters'
import { __rootDomain__ } from '@lib/constants'
import supabase from '@lib/supabase'
import { undoFormatUrl } from '@lib/utils'
import { getServerSession } from 'next-auth'
import { unstable_noStore as noStore } from 'next/cache'
import { notFound, redirect } from 'next/navigation'
import { DeleteDialogContainer, LiveWaitlistInfo } from './client'

export const revalidate = 0

// Gets the table name from the general waitlists table based on the name of the wailist.
async function getTableName(name: string) {
  const { data, error } = (await supabase
    .from('waitlists')
    .select('*')
    .eq('name', name)) as any

  if (error) await logError(error, 'Invalid Table name')

  return data?.length ? data[0].table_name : null
}

async function getInfo(name: string) {
  noStore()
  const table_name = await getTableName(name)
  const { data, error } = await supabase.from(table_name).select('*')

  if (error) await logError(error)

  return data!
}

interface Props {
  searchParams: {
    key: string
  }
}

export default async function AnalyticsPage({ searchParams }: Props) {
  const waiters = await getInfo(undoFormatUrl(searchParams.key))
  const table_name = await getTableName(searchParams.key)

  const url = `${__rootDomain__}/${searchParams.key}`

  async function onDelete() {
    'use server'
    await removeFromGeneralWaitlist(searchParams.key)
    await deleteTable(table_name)
    redirect('/dashboard')
  }

  const { waitlist_table_info: res } = await getWaitlist(
    undoFormatUrl(searchParams.key)
  )

  // disallow users from viewing the stats of others waitlist.
  const session = await getServerSession()
  if (!table_name?.startsWith(session?.user?.email!) || !res?.id) {
    return notFound()
  }

  return (
    <main className="h-screen flex flex-col gap-8 items-center justify-center">
      {res?.id && (
        <>
          <DeleteDialogContainer>
            <DeleteDialog onDelete={onDelete} />
          </DeleteDialogContainer>

          <LiveWaitlistInfo url={url} />

          <section className="flex  max-w-sm">
            {waiters?.length > 0 ? (
              <WaitersList initial={waiters} table_name={table_name} />
            ) : (
              <div className="flex flex-col gap-2 items-center">
                <span>No waiter yet!</span>
                <span className="text-center">
                  💡: When someone waits for your product, their email will show
                  up here.
                </span>
              </div>
            )}
          </section>
        </>
      )}

      <aside className="hidden md:block fixed bottom-4 right-4 w-full max-w-md">
        <Feedback
          placeholder="What other data would you like to see?"
          path="/dashboard"
        />
      </aside>
    </main>
  )
}

