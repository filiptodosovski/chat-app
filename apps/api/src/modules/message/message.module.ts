import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from '../../entity/message.entity';
import { User } from '../../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User])],
  exports: [MessageService],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
