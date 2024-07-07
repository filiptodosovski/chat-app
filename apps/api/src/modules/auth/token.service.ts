import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TDecodedToken } from './types';

@Injectable()
export class TokenService {
  decodeToken(token: string): TDecodedToken {
    try {
      return jwt.decode(token) as TDecodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  getUserIdFromToken(token: string): number {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.userId) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return decoded.userId;
  }
}
