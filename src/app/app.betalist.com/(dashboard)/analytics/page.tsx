import {
  deleteTable,
  getWaitlist,
  logError,
  removeFromGeneralWaitlist
} from '@action'
import { WaitersList } from '@components/waiters'
import supabase from '@lib/supabase'
import { undoFormatUrl } from '@lib/utils'
import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'
import { DeleteDialog } from '@components/delete-product'
import { redirect, notFound } from 'next/navigation'

export const revalidate = 0

// Gets the table name from the general waitlists table based on the name of the wailist.
async function getTableName(name: string) {
  const { data, error } = (await supabase
    .from('waitlists')
    .select('*')
    .eq('name', name)) as any

  if (error) await logError(error, 'Invalid Table name')

  return data.length ? data[0].table_name : null
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

  const url = `${process.env.NEXT_PUBLIC_BETALIST_URL}/${searchParams.key}`

  async function onDelete() {
    'use server'
    await removeFromGeneralWaitlist(searchParams.key)
    await deleteTable(table_name)
    redirect('/app.betalist.com')
  }

  const { waitlist_table_info: res } = await getWaitlist(
    undoFormatUrl(searchParams.key)
  )
  return (
    <main className="h-screen flex flex-col gap-8 items-center justify-center">
      {res?.id ? (
        <div>
          <div className="">
            <DeleteDialog onDelete={onDelete} />
          </div>
          <div>
            <span>Your Page is Live at </span>
            <Link href={url} className="underline underline-2" target="_blank">
              {url}
            </Link>
          </div>
          <div>
            {waiters?.length > 0 ? (
              <WaitersList initial={waiters} table_name={table_name} />
            ) : (
              <div>No waiter yet!</div>
            )}
          </div>
        </div>
      ) : (
        notFound()
      )}
    </main>
  )
}

