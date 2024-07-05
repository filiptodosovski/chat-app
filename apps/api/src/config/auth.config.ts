import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export const authConfig = registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
}));
