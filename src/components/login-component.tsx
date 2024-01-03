'use client'

import { Submit } from '@components/submit-button'
import { Input } from '@ui/input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'

interface Props {
  path?: string
}

export const LoginComponent = ({ path }: Props) => {
  const { refresh } = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formdata = new FormData(e.currentTarget)
    const email = formdata.get('email')
    const password = formdata.get('password')

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: path
        ? `/app.betalist.com/create?url=${path}`
        : '/app.betalist.com'
    })
    if (response?.status === 401) {
      alert('Invalid credentials')
    }

    refresh()
  }

  return (
    <div className="max-w-4xl flex mx-auto min-h-screen justify-center items-center w-screen flex-col gap-4 md:gap-8">
      <form
        onSubmit={handleSubmit}
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
      <p className="flex items-center justify-center gap-1">
        <span>don&apos;t have an users yet?</span>
        <Link
          href={'/app.betalist.com/sign-up'}
          className="underline underline-offset-2"
        >
          signup
        </Link>
      </p>
    </div>
  )
}

