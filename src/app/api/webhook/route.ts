import { logError } from '@action'
import supabase from '@lib/supabase'
import { NextResponse } from 'next/server'

async function processEvent(event: any) {
  const data = event.data.attributes
  if (
    data.status === 'paid' &&
    event.meta.event_name.startsWith('order_created')
  ) {
    const email = data.user_email
    const { error } = await supabase
      .from('users')
      .update({ is_pro: true })
      .eq('email', email)

    if (error) {
      await logError(error, 'An error occured while updating user status')
    }
  } else {
    console.log(data)
    return 'Something went wrong!'
  }
}

async function webhook(request: any) {
  const crypto = require('crypto')

  const rawBody = await request.text()

  const secret = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_SECRET!
  const hmac = crypto.createHmac('sha256', secret)
  const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8')
  const signature = Buffer.from(
    request.headers.get('X-Signature') || '',
    'utf8'
  )

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error('Invalid signature.')
  }

  const data = JSON.parse(rawBody)

  await processEvent(data)

  return NextResponse.json({ status: 200 })
}

export { webhook as POST }

