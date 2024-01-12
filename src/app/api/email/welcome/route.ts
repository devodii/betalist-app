import { EmailTemplate } from '@components/emails/template'
import { Resend } from 'resend'
import * as React from 'react'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Betalist <emmanuelodii29@gmail.com>',
      to: ['emmanuelodii80@gmail.com'],
      subject: 'Welcome to betalist!',
      react: EmailTemplate({ name: 'Emmanuel' }) as React.ReactElement
    })

    if (error) {
      console.error({ error })
    }

    return NextResponse.json({ success: true, message: data })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message })
  }
}

