import { logger } from './plugins/logger';
import { connection } from '@/database';

const bootstrap = async () => {
  await connection.initialize();
  await import('./server.js');
};

bootstrap().catch((error) => {
  logger.error(error);
  process.exit(1);
});
