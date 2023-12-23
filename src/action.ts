'use server'

import { IVerifyUser, WaitList } from '@app/types'
import supabase from '@lib/supabase'
import { PostgrestError } from '@supabase/supabase-js'
import { getServerSession } from 'next-auth'

// TODO: Extend the parameters
type Error = Parameters<(error: PostgrestError, msg?: string) => void>
export async function logError(...args: Error) {
  const message = args[1] ?? 'An error occured: '
  console.error(message, args[0])
  return message
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

  // creates a new waitlist in the general database
  const { error } = await supabase
    .from('waitlists')
    .insert({ name, user_id: user_id, table_name })

  if (error) logError(error)

  // creates a new table.
  await createTable(table_name)
}

export async function findTable(name: string) {
  const { data, error } = await supabase.from(name).select('*')

  if (error) logError(error)

  return data
}

export async function getWaitlist(name: string) {
  const { data, error } = await supabase
    .from('waitlists')
    .select('*')
    .eq('name', name)

  if (error) logError(error)

  const waitlist_table_info: WaitList = data ? data[0] : null

  const results: any = await findTable(waitlist_table_info?.table_name)

  return { waitlist_table_info, results } // the individual waitlist that was created by supabase function
}

export async function insertIntoTable(
  email: string,
  username: string,
  table_name: string
) {
  const { waitlist_table_info } = await getWaitlist(table_name)

  const { error } = await supabase
    .from(waitlist_table_info?.table_name)
    .insert({ email, username })

  if (error) logError(error)
}

