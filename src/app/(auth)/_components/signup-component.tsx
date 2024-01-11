'use client'

import { Form } from '@auth/form'
import supabase from '@lib/supabase'
import { signIn } from 'next-auth/react'

interface Props {
  path?: string
}

export function SignUpComponent(props: Props) {
  async function handleSubmit(formdata: FormData) {
    const email = formdata.get('email')
    const password = formdata.get('password')

    const { status } = await supabase.from('users').insert({ email, password })

    if (status === 201) {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: props.path
          ? `/dashboard/create?url=${props.path}`
          : '/dashboard'
      })
    }

    try {
      await fetch('/api/email/welcome', { method: 'POST' })
    } catch (error: any) {
      console.error('Error sending email', error.message)
    }
  }
  return <Form action={handleSubmit} type="sign-up" />
}

