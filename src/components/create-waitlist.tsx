'use client'

import { createWaitlist } from '@action'
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
import { Switch } from '@ui/switch'
import { revalidatePath } from 'next/cache'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

type Fields = {
  email: boolean
}

interface CreateWaitListFormProps {
  email: string
  url: string
}

export function CreateWaitListForm({ email, url }: CreateWaitListFormProps) {
  const [fields, setFields] = React.useState<Fields>({
    email: true
  })

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const path = searchParams.get('url')

  const pathname = usePathname()
  const { replace, push } = useRouter()

  function handleUpdate(term: string) {
    term ? params.set('url', term) : params.delete('url')
    replace(`${pathname}?${params.toString()}`)
  }

  function handleUpdateFields() {
    setFields(prevFields => ({
      ...prevFields,
      email: !prevFields.email
    }))
    !fields.email ? params.set('email', 'true') : params.delete('email')
    replace(`${pathname}?${params.toString()}`)
  }

  async function create(formdata: FormData) {
    const name = formdata.get('name')

    if (!name) return

    const { error_occured, error_msg } = await createWaitlist(email, url)

    if (error_occured) {
      alert(`Error: ${error_msg}`)
    } else {
      revalidatePath('/dashboard')
      return push('/dashboard')
    }
  }

  return (
    <Card className="bg-[#1A1A17] text-white opacity-90 p-8 border-none flex flex-col gap-4 w-full max-w-[550px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription className="text-[16px]">
          Deploy your new project in one-click.
        </CardDescription>

        <CardContent>
          <form className="flex flex-col gap-6" action={create}>
            <div className="flex flex-col gap-2">
              <Label className="text-white lg:text-lg">Name | URL</Label>
              <Input
                className="flex-1 bg-dark-main text-white text-[20px] font-medium"
                defaultValue={path!}
                onChange={e => handleUpdate(e.target.value)}
                placeholder="Product name..."
                name="name"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-white lg:text-lg">Fields</Label>

              <div className="flex items-center space-x-2">
                <Switch
                  id="email-address"
                  className="checked:bg-red-500 data-[state=checked]:bg-green-500"
                  onClick={handleUpdateFields}
                  defaultChecked
                />
                <Label htmlFor="email-address" className="text-white text-lg">
                  Email address
                </Label>
              </div>
            </div>

            <Submit text="Create" />
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

