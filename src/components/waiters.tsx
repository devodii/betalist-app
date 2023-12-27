import { WaitListTable } from '@app/types'

type WaitersListProps = {
  list: WaitListTable[]
}

export function WaitersList(props: WaitersListProps) {
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

