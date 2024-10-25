import { logger } from './plugins/logger.js';
import { connection } from '@/database/index.js';

const bootstrap = async () => {
  await connection.initialize();
  await import('./server.js');
};

bootstrap().catch((error) => {
  logger.error(error);
  process.exit(1);
});
