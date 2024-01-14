'use client'

import { Form } from '@auth/form'
import { Button } from '@components/ui/button'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Props {
  path?: string
}

export const SignInComponent = (props: Props) => {
  const { refresh } = useRouter()

  async function handleSubmit(formdata: FormData) {
    const email = formdata.get('email')
    const password = formdata.get('password')

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: props.path
        ? `/dashboard/create?url=${props.path}`
        : '/dashboard'
    })
    
    if (response?.status === 401) {
      alert('Account not found, try sign up instead :)')
    }

    refresh()
  }

  async function logIn() {
    await signIn('google')
  }
  return (
    <>
      <Form action={handleSubmit} type="sign-in">
        <p className="flex items-center justify-center gap-1">
          <span>don&apos;t have an users yet?</span>
          <Link href={'/sign-up'} className="underline underline-offset-2">
            signup
          </Link>
        </p>
      </Form>
      {/* <Button onClick={logIn}>Sign in with google</Button> */}
    </>
  )
}

