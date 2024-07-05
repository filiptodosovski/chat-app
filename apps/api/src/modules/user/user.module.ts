import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from '../../entity/user.entity';
import { Message } from '../../entity/message.entity';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
