export interface IUserLoginPayload {
  username: string;
  password: string;
}

export interface UserJwtPayload {
  userId: number;
  username: string;
}
