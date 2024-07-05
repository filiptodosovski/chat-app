import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';
import * as process from 'node:process';

const environment = process.env.NODE_ENV ?? 'development';

export const config: DataSourceOptions = {
  type: 'postgres',
  synchronize: true,
  logging: environment === 'development',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrationsRun: false,
  entities: [
    path.resolve(__dirname, '..', 'entity') + '/*.ts',
    path.resolve(__dirname, '..') + '/**/*.entity.ts',
  ],
  migrations: [
    path.resolve(__dirname, '..', 'database', 'migrations') + '/**/*.js',
  ],
  subscribers: [
    path.resolve(__dirname, '..', 'entity', 'subscribers') +
      '/**/*.subscriber{.ts,.js}',
  ],
  extra: {
    connectionLimit: 10,
  },
};

export const databaseConfig = registerAs('db', () => ({
  ...config,
  autoLoadEntities: true,
}));

export default new DataSource(config);
