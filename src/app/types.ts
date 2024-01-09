type UUID = string

export interface Account {
  id: UUID
  email: string
  created_at: Date
  is_pro?: boolean // defaults to false
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
}

export interface Feedback {
  id: UUID
  text: string
  created_at: string
  sender_id: string
}

