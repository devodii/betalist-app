'use server'

import { greet } from '@app/app.betalist.com/(auth)/action'
import { IVerifyUser, WaitList } from '@app/types'
import supabase from '@lib/supabase'
import { PostgrestError } from '@supabase/supabase-js'

// TODO: Extend the parameters
type Error = Parameters<(error: PostgrestError, msg?: string) => void>
export async function logError(...args: Error) {
  console.error(args[1] ?? 'An error occured', args[0])
}

export async function findId(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)

  if (error) {
    await logError(error, 'User not found')
  }

  return data ? data[0]?.id : null
}

export async function verifyUser(
  email: string,
  password: string
): Promise<IVerifyUser> {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)

  if (user) {
    await greet()
  }

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

  if (error) await logError(error, 'Error creating table!')

  return { data, error }
}

export async function deleteTable(name: string) {
  const { data, error } = await supabase.rpc('public.delete_table', {
    name
  })

  if (error) await logError(error, 'Error deleting table!')

  return { data, error }
}

type CreateWaitListReturn = {
  error_msg: string
  error_occured: boolean
}

export async function createWaitlist(
  email: string,
  name: string
): Promise<CreateWaitListReturn> {
  const user_id = await findId(email!)
  const table_name = `${email}_${name}`

  let error_occured = false
  let error_msg = ''

  const existing_table = await findTable(table_name)

  if (existing_table?.length || existing_table) {
    console.log({ existing_table })
    error_occured = true
    error_msg = 'Name in use'
    return { error_occured, error_msg }
  }

  // creates a new table.
  const { error: table_creation_error } = await createTable(table_name)!

  if (table_creation_error) {
    error_occured = true
    error_msg = table_creation_error.message as string
    return { error_occured, error_msg }
  }

  // creates a new waitlist in the general database
  const { error } = await supabase
    .from('waitlists')
    .insert({ name, user_id: user_id, table_name })

  if (error) await logError(error)

  return { error_occured, error_msg }
}

export async function findTable(name: string) {
  const { data, error } = await supabase.from(name).select('*')

  if (error) await logError(error)

  return data
}

export async function getWaitlist(name: string) {
  const { data, error } = await supabase
    .from('waitlists')
    .select('*')
    .eq('name', name)

  if (error) await logError(error)

  const waitlist_table_info: WaitList = data ? data[0] : null

  const results: any = await findTable(waitlist_table_info?.table_name)

  return { waitlist_table_info, results } // the individual waitlist that was created by supabase function
}

export async function insertIntoTable(
  email: string,
  table_name: string,
  username?: string
) {
  const { waitlist_table_info } = await getWaitlist(table_name)

  const { error } = await supabase
    .from(waitlist_table_info?.table_name)
    .insert({ email, username })

  if (error) await logError(error)
}

export async function getUserWaitlists(email: string): Promise<WaitList[]> {
  const user_id = await findId(email)
  const { data, error } = await supabase
    .from('waitlists')
    .select('*')
    .eq('user_id', user_id)

  if (error) await logError(error, 'Waitlist not found')

  return data!
}

export async function removeFromGeneralWaitlist(name: string) {
  const { error } = await supabase.from('waitlists').delete().eq('name', name)

  if (error) {
    await logError(error, 'Failed to delete!')
  }
}

