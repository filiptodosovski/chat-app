export interface IMessage {
  id: number
  created_at: Date
  updated_at: Date
  user: IUser
  content: string
}

export interface IUser {
  id: number
  username: string
}
