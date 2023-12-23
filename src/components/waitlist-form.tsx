'use client'

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
import { Button } from './ui/button'
import { getWaitlist, insertIntoTable } from '@action'

interface Props {
  waitlistInfo: WaitList
}

export function WaitListForm(props: Props) {
  async function create(formdata: FormData) {
    console.log('submitting...')
    const username = formdata.get('username') as string
    const email = formdata.get('email') as string

    console.log({ username, email })
    if (!email || !username) return

    await insertIntoTable(email, username, props.waitlistInfo?.name)
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
            <div className="flex flex-col gap-2">
              <Label className="text-white lg:text-lg">Your Name</Label>
              <Input
                className="flex-1 bg-dark-main text-white text-[20px] font-medium"
                placeholder="Emmanuel Odii"
                name="username"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-white lg:text-lg">Your Email</Label>
              <Input
                className="flex-1 bg-dark-main text-white text-[20px] font-medium"
                placeholder="emmanuelodii@gmail.com"
                name="email"
              />
            </div>

            <Button variant="secondary" type="submit" className="self-end">
              Submit
            </Button>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

