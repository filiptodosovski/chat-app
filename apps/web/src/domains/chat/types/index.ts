export type TMessage = {
  id: number
  created_at: Date
  updated_at: Date
  user: TUser
  content: string
}

export type TUser = {
  id: number
  username: string
}
