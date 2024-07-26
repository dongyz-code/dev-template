import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { NODE_ENV, STATIC_CONF } from '@/config';
import { User } from './models/user';

export const connection = new DataSource({
  type: 'postgres',
  ...STATIC_CONF.pg,
  logger: NODE_ENV === 'dev' ? 'advanced-console' : 'file',
  synchronize: NODE_ENV === 'dev',
  entities: [User],
});
