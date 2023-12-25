import { logError } from '@action'
import supabase from '@lib/supabase'
import { WaitListTable } from '@app/types'
import { undoFormatUrl } from '@lib/utils'
import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'

export const revalidate = 10
export const fetchCache = 'force-no-store'

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
  params: {
    name: string
  }
}

export default async function ActivityPage({ params: { name } }: Props) {
  const waiters = await getInfo(undoFormatUrl(name))

  const url = `http://localhost:3000/${name}`
  return (
    <div className="h-screen flex flex-col gap-8 items-center justify-center">
      <div>
        <span>Your Page is Live at </span>
        <Link href={url} className="underline underline-2" target="_blank">
          {url}
        </Link>
      </div>
      {waiters?.length > 0 ? (
        <WaitersList list={waiters} />
      ) : (
        <div>No waiter yet!</div>
      )}
    </div>
  )
}

type WaitersListProps = {
  list: WaitListTable[]
}

function WaitersList(props: WaitersListProps) {
  return (
    <ul className="grid grid-cols-1">
      Waiters:
      {props.list.map(waiter => (
        <li key={waiter.id} className="list-none">
          {waiter.email}
        </li>
      ))}
    </ul>
  )
}

