import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Env } from '@/config/index.js';
import { join } from 'path';
import { getESDirname } from '@/utils/dir.js';

const __dirname = getESDirname(import.meta.url);
const entitiesPath = join(__dirname, '..', 'modules', '**', '*.entity.{js,ts}');

export const connection = new DataSource({
  type: 'postgres',
  url: Env.DATABASE_URL,
  synchronize: Env.NODE_ENV === 'dev',
  entities: [entitiesPath],
  schema: 'dev_fastify_template',
});
