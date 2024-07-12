export interface IUser {
  id: number
  accessToken: string
  username: string
}

declare module 'next-auth' {
  interface Session {
    user?: IUser
    error?: string
  }

  interface User extends IUser {
    user?: IUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: IUser
  }
}
