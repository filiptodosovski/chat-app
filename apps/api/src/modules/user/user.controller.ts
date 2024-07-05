import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUserDTO';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async findOneUser(@Query('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Post('/')
  async createUser(@Body() { username, password }: CreateUserDTO) {
    return await this.userService.createUser(username, password);
  }
}
