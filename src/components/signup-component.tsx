'use client'

import supabase from '@lib/supabase'
import { Input } from '@ui/input'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { Submit } from './submit-button'

export function SignUpComponent() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('submit')
    const formdata = new FormData(e.currentTarget)
    const email = formdata.get('email')
    const password = formdata.get('password')

    const { status } = await supabase.from('users').insert({ email, password })

    if (status === 201) {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/app.betalist.com'
      })
    }
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

        <Submit text="Register" />
      </form>
    </div>
  )
}

