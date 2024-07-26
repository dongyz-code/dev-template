import { logger } from './plugins/logger';

const bootstrap = async () => {
  await import('./server.js');
};

bootstrap().catch((error) => {
  logger.error(error);
  process.exit(1);
});
