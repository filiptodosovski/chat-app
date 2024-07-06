import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import process from 'node:process';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async findOneUser(@Query('username') username: string) {
    console.log(parseInt(process.env.WS_PORT, 10));
    return await this.userService.findOne(username);
  }

  @Post('/')
  async createUser(@Body() { username, password }: CreateUserDto) {
    return await this.userService.createUser(username, password);
  }
}
