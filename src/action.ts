'use server'

import { IVerifyUser } from '@app/types'
import supabase from '@lib/supabase'
import { PostgrestError } from '@supabase/supabase-js'
import { getServerSession } from 'next-auth'

export async function logError(error: PostgrestError, msg?: string) {
  console.error(`${msg ?? 'An error occured:'} `, error)
  return error
}

export async function findId(email: string) {
  const { data, error } = await supabase
    .from('account')
    .select('id')
    .eq('email', email)

  if (error) {
    logError(error)
  }

  return data ? data[0]?.id : null
}

export async function verifyUser(
  email: string,
  password: string
): Promise<IVerifyUser> {
  const { data: user, error } = await supabase
    .from('account')
    .select('*')
    .eq('email', email)

  if (error) {
    console.error('Error fetching user:', error)
  }

  return !user
    ? { status: false, message: 'user not found', user: null }
    : user[0].password === password
      ? { message: '', status: true, user: user[0] }
      : { status: false, message: 'password is incorrect', user: null }
}

export async function createTable(name: string) {
  const { data, error } = await supabase.rpc('create_table', {
    name
  })

  if (error) {
    console.error(error)
  }

  return data
}

export async function createWaitlist(name: string) {
  const session = await getServerSession()
  const email = session?.user?.email
  const user_id = await findId(email!)
  const table_name = `${session?.user?.email}_${name}`

  const { data, error } = await supabase
    .from('waitlists')
    .insert({ name, user_id: user_id, table_name })

  if (error) {
    console.log(error)
  }

  await createTable(table_name)
}
