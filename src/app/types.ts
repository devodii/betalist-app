type UUID = string

export interface Account {
  id: UUID
  email: string
  created_at: Date
}

export interface IVerifyUser {
  status: boolean
  message?: string
  user: Account | null
}

// the general waitlist table
export interface WaitList {
  id: UUID
  name: string
  table_name: string
  created_at: string
  user_id: UUID
}

// the dynamic table for the waitlist
export interface WaitListTable {
  id: UUID
  email: string
  username: string
}

