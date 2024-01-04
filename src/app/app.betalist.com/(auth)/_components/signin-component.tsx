'use client'

import { Form } from '@auth/form'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Props {
  path?: string
}

export const SignInComponent = ({ path }: Props) => {
  const { refresh } = useRouter()

  async function handleSubmit(formdata: FormData) {
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
    <Form action={handleSubmit}>
      <p className="flex items-center justify-center gap-1">
        <span>don&apos;t have an users yet?</span>
        <Link
          href={'/app.betalist.com/sign-up'}
          className="underline underline-offset-2"
        >
          signup
        </Link>
      </p>
    </Form>
  )
}

