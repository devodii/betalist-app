import { formatUrl } from '@lib/utils'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    name: string
  }
}
export default function WaitListNamePage({ params: { name } }: Props) {
  const url = `/dashboard/${formatUrl(name)}/activities`

  return redirect(url)
}
