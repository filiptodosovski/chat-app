import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async findOneUser(@Query('username') username: string) {
    return await this.userService.findOne(username);
  }

  @Post('/')
  async createUser(@Body() { username, password }: CreateUserDto) {
    return await this.userService.createUser(username, password);
  }
}
