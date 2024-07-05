import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/send')
  async send(@Body() { content, userId }) {
    return await this.messageService.create(content, userId);
  }

  @Get('/all')
  async findAll() {
    return this.messageService.findAll();
  }
}
