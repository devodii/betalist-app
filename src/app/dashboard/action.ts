'use server'

import { logError } from '@action'
import supabase from '@lib/supabase'
import { ls } from '@lib/lemon-squeezy'

export async function getLifetimeStatus(email: string): Promise<boolean> {
  const { data: user, error } = await supabase
    .from('users')
    .select('is_pro')
    .eq('email', email)

  if (error) {
    await logError(error, 'Lifetime status is invalid!')
    return false
  }

  return user?.[0].is_pro
}

export async function redirectToCheckout() {
  const products = await ls.getProducts()
  const url = products.data[0].attributes.buy_now_url

  return url
}

