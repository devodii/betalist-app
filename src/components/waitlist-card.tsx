import NextLink from 'next/link'
import { WaitList } from '@app/types'
import { formatUrl } from '@lib/utils'
import { Card, CardContent, CardTitle } from '@ui/card'

export function WaitlistCard(props: Pick<WaitList, 'name' | 'created_at'>) {
  const url = `/app.betalist.com/analytics?key=${formatUrl(props.name)}`

  return (
    <NextLink href={url}>
      <Card className="bg-inherit border-grayish text-white opacity-80 min-h-[200px] cursor-pointer p-4">
        <CardTitle className="truncate">{props.name}</CardTitle>
        <CardContent>
          <span className="block">{props.created_at}</span>
        </CardContent>
      </Card>
    </NextLink>
  )
}

