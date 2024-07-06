import { MessageGateway } from './message.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [MessageGateway],
})
export class EventsModule {}
