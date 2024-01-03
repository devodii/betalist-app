'use client'

import { insertIntoTable } from '@action'
import { WaitList } from '@app/types'
import { Submit } from '@components/submit-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@ui/card'
import { Input } from '@ui/input'
import { Label } from '@ui/label'
import { useRouter } from 'next/navigation'

interface Props {
  waitlistInfo: WaitList
  product_name?: string
}

export function WaitListForm(props: Props) {
  const { push } = useRouter()
  const redirect_url = `/${props.product_name}?success=true`

  async function create(formdata: FormData) {
    const email = formdata.get('email') as string

    if (!email) return

    await insertIntoTable(email, props.waitlistInfo?.name)
    setTimeout(() => push(redirect_url, 2000))
  }

  return (
    <Card className="bg-[#1A1A17] text-white opacity-90 p-8 border-none flex flex-col gap-4 w-full max-w-[550px]">
      <CardHeader>
        <CardTitle>{props.waitlistInfo?.name}</CardTitle>
        <CardDescription className="text-[16px]">
          The description for this product
        </CardDescription>

        <CardContent>
          <form className="flex flex-col gap-2 -ml-5 mt-4" action={create}>
            <Label className="text-white lg:text-lg">Your Email</Label>
            <Input
              className="flex-1 bg-dark-main text-white text-[20px] font-medium"
              placeholder="emmanuelodii@gmail.com"
              name="email"
            />

            <Submit text="Submit" />
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

