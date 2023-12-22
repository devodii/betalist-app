'use client'

import { WaitList } from '@app/types'
import { formatUrl } from '@lib/utils'
import { useLocalStorage } from '@hooks/use-local-storage'
import { Card, CardContent, CardFooter, CardTitle } from '@shadcn/card'
import { useRouter } from 'next/navigation'

export function WaitlistCard(props: Pick<WaitList, 'name' | 'created_at'>) {
  const { push } = useRouter()
  const { setValue } = useLocalStorage('test')
  const url = `/dashboard/${formatUrl(props.name)}/activities`

  /**
   * @dev
   * Saves the correct name format in local-storage,
   * To be used in the activities page to render the name correctly
   */
  async function onRedirect() {
    setValue(props.name)
    setTimeout(() => push(url), 300)
  }

  return (
    <Card
      className="bg-inherit border-grayish text-white opacity-80 min-h-[200px] cursor-pointer"
      onClick={onRedirect}
    >
      <CardFooter>
        <CardTitle className="truncate">{props.name}</CardTitle>
        <CardContent>
          <span>{props.created_at}</span>
        </CardContent>
      </CardFooter>
    </Card>
  )
}
