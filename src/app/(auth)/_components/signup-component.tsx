'use client'

import { Form } from '@app/(auth)/_components/form'
import supabase from '@lib/supabase'
import { signIn } from 'next-auth/react'

export function SignUpComponent() {
  async function handleSubmit(formdata: FormData) {
    const email = formdata.get('email')
    const password = formdata.get('password')

    const { status } = await supabase.from('users').insert({ email, password })

    if (status === 201) {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/dashboard'
      })
    }
  }
  return <Form action={handleSubmit} type="sign-up" />
}

