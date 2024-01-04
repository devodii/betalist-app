import * as React from 'react'
import { Input } from '@ui/input'
import { Submit } from '@components/submit-button'

interface Props {
  action: (formdata: FormData) => void
  children?: React.ReactNode
}

export function Form(props: Props) {
  return (
    <div className="max-w-4xl flex mx-auto min-h-screen justify-center items-center w-screen flex-col gap-4 md:gap-8">
      <form
        action={props.action}
        className="flex flex-col items-center gap-4 w-full"
      >
        <Input
          placeholder="johndoe@gmail.com"
          className="text-black"
          name="email"
          required
        />
        <Input
          placeholder="password"
          className="text-black"
          name="password"
          required
        />

        <Submit text="Login" variant="secondary" />
      </form>
      {props?.children}
    </div>
  )
}

