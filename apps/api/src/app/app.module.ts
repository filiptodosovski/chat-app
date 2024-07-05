import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserModule } from '../modules/user/user.module';
import { Message } from '../entity/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'filiptodosovski',
      password: '',
      database: 'chatapp',
      entities: [User, Message],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
