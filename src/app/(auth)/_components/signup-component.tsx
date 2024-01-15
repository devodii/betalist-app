'use client'

import { Form } from '@auth/form'
import supabase from '@lib/supabase'
import { signIn } from 'next-auth/react'
import bcrypt from 'bcrypt'
import { __saltOrRounds__ } from '@lib/constants'

interface Props {
  path?: string
}

export function SignUpComponent(props: Props) {
  async function handleSubmit(formdata: FormData) {
    const email = formdata.get('email')
    const password = formdata.get('password') as string

    const hashedPassword = await bcrypt.hash(password, __saltOrRounds__)

    const { status, data } = await supabase
      .from('users')
      .insert({ email, hashedPassword })

    console.log({ data })

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

