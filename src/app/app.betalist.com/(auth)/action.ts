import { EmailTemplate } from '@components/emails/template'
import { Resend } from 'resend'
import * as React from 'react'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export async function greet() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <betalist.dev>',
      to: ['emmanuelodii@gmail.com'],
      subject: 'Welcome!',
      react: EmailTemplate({ name: 'Emmanuel' }) as React.ReactElement
    })

    if (error) {
      console.error({ error })
    }

    return console.log({ data })
  } catch (error) {
    return console.error({ error })
  }
}

