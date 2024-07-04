import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'filiptodosovski',
      password: '',
      database: 'chatapp',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
