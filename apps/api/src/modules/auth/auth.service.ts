import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserLoginPayload, UserJwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IUserLoginPayload) {
    const userFromDb = await this.userService.findOne(user.username);

    if (!userFromDb) {
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    }

    const { password, ...userData } = userFromDb;

    const compare = await bcrypt.compare(user.password, password ?? '');

    if (!compare) {
      throw new HttpException(
        'Email or password is incorrect!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: UserJwtPayload = {
      userId: userFromDb.id,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken: accessToken,
      user: { ...userData, accessToken },
    };
  }
}
