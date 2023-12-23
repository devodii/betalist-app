'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Input } from '@components/ui/input'
import { Spinner } from '@icons'
import { Button, ButtonProps } from '@shadcn/button'
import { Label } from '@shadcn/label'
import { revalidatePath } from 'next/cache'

type Fields = {
  email: boolean
  name: boolean
}

interface CardWithFormProps {
  action: () => void
}

export function CardWithForm({ action }: CardWithFormProps) {
  const [fields, setFields] = React.useState<Fields>({
    email: true,
    name: true
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
      email: !prevFields.email,
      name: !prevFields.name
    }))
    !fields.email ? params.set('email', 'true') : params.delete('email')
    !fields.name ? params.set('name', 'true') : params.delete('name')
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Card className="bg-[#1A1A17] text-white opacity-90 p-8 border-none flex flex-col gap-4 w-full max-w-[550px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription className="text-[16px]">
          Deploy your new project in one-click.
        </CardDescription>

        <CardContent>
          <form
            className="flex flex-col gap-6"
            onSubmit={e => e.preventDefault()}
          >
            <div className="flex flex-col gap-2">
              <Label className="text-white lg:text-lg">Name | URL</Label>
              <Input
                className="flex-1 bg-dark-main text-white text-[20px] font-medium"
                defaultValue={path!}
                onChange={e => handleUpdate(e.target.value)}
                placeholder="Product name..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-white lg:text-lg">Fields</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="name"
                  className="checked:bg-red-500 data-[state=checked]:bg-green-500"
                  onClick={handleUpdateFields}
                  defaultChecked
                />
                <Label htmlFor="name" className="text-white text-lg">
                  Name
                </Label>
              </div>
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
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="text-black">
            Cancel
          </Button>
          <Deploy action={action} />
        </CardFooter>
      </CardHeader>
    </Card>
  )
}

interface DeployProps extends ButtonProps {
  action: () => void
}

function Deploy(props: DeployProps) {
  const { push } = useRouter()
  const [creating, setCreating] = React.useState<boolean>(false)

  function create() {
    setCreating(true)
    setTimeout(() => {
      props.action()
      setCreating(false)
      push('/dashboard')
      revalidatePath('/')
    }, 4000)
  }

  return (
    <Button
      className="flex items-center gap-1 p-4"
      type="submit"
      {...props}
      aria-disabled={creating}
      onClick={create}
    >
      <span>create</span>
      {creating && <Spinner size={24} className="animate-spin" />}
    </Button>
  )
}

