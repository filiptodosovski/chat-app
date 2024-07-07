export interface IUserLoginPayload {
  username: string;
  password: string;
}

export interface UserJwtPayload {
  userId: number;
  username: string;
}

export type TDecodedToken = {
  userId: number;
  username: string;
  iat: number;
  exp: number;
};
