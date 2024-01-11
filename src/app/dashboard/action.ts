'use server'

import { logError } from '@action'
import supabase from '@lib/supabase'

export async function getLifetimeStatus(email: string): Promise<boolean> {
  const { data: user, error } = await supabase
    .from('users')
    .select('is_pro')
    .eq('email', email)

  if (error) {
    await logError(error, 'Lifetime status is invalid!')
    return false
  }

  return user?.[0]?.is_pro
}

