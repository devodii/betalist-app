'use client'

import * as React from 'react'
import supabase from '@lib/supabase'
import { WaitListTable } from '@app/types'
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js'

type WaitersListProps = {
  list: WaitListTable[]
}

export function WaitersList(props: WaitersListProps) {
  const [submissions, setSubmissions] = React.useState(props.list)

  React.useEffect(() => {
    const channel = supabase
      .channel('realtime chats')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'emmanuel@gmail.com_DropBox'
        },
        (payload: RealtimePostgresInsertPayload<WaitListTable>) => {
          console.log('received!')
          console.log({ payload })
          setSubmissions([...submissions, payload.new])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [submissions, setSubmissions])

  return (
    <ul className="grid grid-cols-1">
      Waiters:
      {submissions.map(waiter => (
        <li key={waiter.id} className="list-none">
          {waiter.email}
        </li>
      ))}
    </ul>
  )
}

