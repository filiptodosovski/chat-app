import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    const user = await this.userService.findOneWithPassword(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IUserLoginPayload) {
    const userData = await this.validateUser(user.username, user.password);

    if (!userData) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload: UserJwtPayload = {
      userId: userData.id,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken: accessToken,
      user: { ...userData, accessToken },
    };
  }
}
