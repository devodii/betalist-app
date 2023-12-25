import { logError } from '@action'
import supabase from '@lib/supabase'
import { undoFormatUrl } from '@lib/utils'
import { unstable_noStore as noStore } from 'next/cache'

export const revalidate = 0
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
  return (
    <div className="h-screen flex items-center justify-center">
      {waiters?.length > 0 ? (
        <ul className="grid grid-cols-1">
          Emails:
          {waiters.map(waiter => (
            <li key={waiter.id} className="list-none">
              {waiter.email}
            </li>
          ))}
        </ul>
      ) : (
        <div>No waiter yet!</div>
      )}
    </div>
  )
}

