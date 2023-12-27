import Link from 'next/link'
import { logError } from '@action'
import { WaitersList } from '@components/waiters'
import supabase from '@lib/supabase'
import { undoFormatUrl } from '@lib/utils'
import { unstable_noStore as noStore } from 'next/cache'

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

  const url = `http://localhost:3000/${searchParams.key}`
  return (
    <div className="h-screen flex flex-col gap-8 items-center justify-center">
      <div>
        <span>Your Page is Live at </span>
        <Link href={url} className="underline underline-2" target="_blank">
          {url}
        </Link>
      </div>
      {waiters?.length > 0 ? (
        <WaitersList initial={waiters} table_name={table_name} />
      ) : (
        <div>No waiter yet!</div>
      )}
    </div>
  )
}

