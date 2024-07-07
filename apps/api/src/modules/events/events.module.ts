import { MessageGateway } from './message.gateway';
import { Module } from '@nestjs/common';
import { TokenService } from '../auth/token.service';
import { MessageService } from '../message/message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { Message } from '../../entity/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [MessageGateway, TokenService, MessageService],
})
export class EventsModule {}
