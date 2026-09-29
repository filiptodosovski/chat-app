import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { SendMessageDTO } from './dto/sendMessage.dto';
import { UserJwtPayload } from '../auth/types';

@Controller('message')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/send')
  async send(
    @Body() { content }: SendMessageDTO,
    @CurrentUser() user: UserJwtPayload,
  ) {
    return await this.messageService.create(content, user.userId);
  }

  @Get('/all')
  async findAll() {
    return this.messageService.findAll();
  }
}
