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

export interface WaitList {
  id: UUID
  name: string
  table_name: string
  created_at: string
  user_id: UUID
}
