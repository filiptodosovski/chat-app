import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from '../config/database.config';
import { MessageModule } from '../modules/message/message.module';
import { AuthModule } from '../modules/auth/auth.module';
import { authConfig } from '../config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        ...(await config.get('db')),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    MessageModule,
    AuthModule,
  ],
})
export class AppModule {}
