'use client'

import { WaitListTable } from '@app/types'
import supabase from '@lib/supabase'
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js'
import * as React from 'react'

type Props = {
  initial: WaitListTable[]
  table_name: string
}

export function WaitersList(props: Props) {
  const [submissions, setSubmissions] = React.useState(props.initial)

  React.useEffect(() => {
    const channel = supabase
      .channel('realtime submissions')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: props.table_name
        },
        (payload: RealtimePostgresInsertPayload<WaitListTable>) => {
          setSubmissions([...submissions, payload.new])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [submissions, setSubmissions, props.table_name])

  return (
    <ul className="grid grid-cols-1 gap-1">
      Waiters:
      {submissions.map(waiter => (
        <li key={waiter.id} className="list-none">
          {waiter.email}
        </li>
      ))}
    </ul>
  )
}

