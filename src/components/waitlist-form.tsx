'use client'

import { insertIntoTable } from '@action'
import { WaitList } from '@app/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@shadcn/card'
import { Input } from '@shadcn/input'
import { Label } from '@shadcn/label'
import { useRouter } from 'next/navigation'
import { Create } from '@components/create-button'

interface Props {
  waitlistInfo: WaitList
  product_name?: string
}

export function WaitListForm(props: Props) {
  const { push } = useRouter()
  const redirect_url = `/${props.product_name}/thank-you`

  async function create(formdata: FormData) {
    // const username = formdata.get('username') as string
    const email = formdata.get('email') as string

    if (!email) return

    await insertIntoTable(email, props.waitlistInfo?.name)
    setTimeout(() => push(redirect_url, 2000))
  }

  return (
    <Card className="bg-[#1A1A17] text-white opacity-90 p-8 border-none flex flex-col gap-4 w-full max-w-[550px]">
      <CardHeader>
        <CardTitle>{props.waitlistInfo?.name}</CardTitle>
        {/* TODO: Add dynamic description */}
        <CardDescription className="text-[16px]">
          The description for this product
        </CardDescription>

        <CardContent>
          <form className="flex flex-col gap-6 -ml-5 mt-4" action={create}>
            {/* <div className="flex flex-col gap-2">
              <Label className="text-white lg:text-lg">Your Name</Label>
              <Input
                className="flex-1 bg-dark-main text-white text-[20px] font-medium"
                placeholder="Emmanuel Odii"
                name="username"
              />
            </div> */}

            <div className="flex flex-col gap-2">
              <Label className="text-white lg:text-lg">Your Email</Label>
              <Input
                className="flex-1 bg-dark-main text-white text-[20px] font-medium"
                placeholder="emmanuelodii@gmail.com"
                name="email"
              />
            </div>

            <Create text="Submit" />
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

