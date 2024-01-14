'use client'

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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { CreateWaitlistError } from './create-waitlist-error'
import { GetLifeTimeAccess } from './get-lifetime-access'
import { Button } from './ui/button'

type Fields = {
  email: boolean
}
type Error = {
  message: string
  render: boolean
}

interface Props {
  action: (formdata: FormData) => Promise<string | null | void>
}

export function CreateWaitListForm(props: Props) {
  const [fields, setFields] = React.useState<Fields>({
    email: true
  })
  const [error, setError] = React.useState<Error>({
    message: '',
    render: false
  })

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const path = searchParams.get('url')

  const pathname = usePathname()
  const { replace } = useRouter()

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

  // todo: refactor
  async function mainAction(formdata: FormData) {
    const message = await props.action(formdata)

    if (error) {
      setError(prev => ({
        message: message as string,
        render: !prev.render // toggles the re-render prop passed to the error component.
      }))
    }

    console.log(error.render)
  }
  return (
    <Card className="bg-[#1A1A17] text-white opacity-90 p-8 border-none flex flex-col gap-4 w-full max-w-[550px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription className="text-[16px]">
          Deploy your new project in one-click.
        </CardDescription>

        <CardContent>
          <form className="flex flex-col gap-6" action={mainAction}>
            <div className="flex flex-col gap-2">
              <Label className="text-white lg:text-lg">Name</Label>
              <Input
                className="flex-1 bg-dark-main text-white text-[20px] font-medium"
                defaultValue={path!}
                onChange={e => handleUpdate(e.target.value)}
                placeholder="Product name..."
                name="name"
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

          {/*  <GetLifeTimeAccess reason="trial exceeded">
                <Button
                  variant="secondary"
                  className="w-full flex items-center gap-1 p-4"
                >
                  Create
                </Button>
              </GetLifeTimeAccess>
               */}
          <CreateWaitlistError
            description={error.message}
            render={error.render}
          />
        </CardContent>
      </CardHeader>
    </Card>
  )
}

