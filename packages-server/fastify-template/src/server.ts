import Fastify from 'fastify';
import { SERVER_PORT } from '@/config';
import { fastifyLogger, logger } from '@/plugins/logger';

const app = Fastify({
  logger: fastifyLogger,
});

app.listen({ port: SERVER_PORT }, (err, address) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
});

process.on('uncaughtException', logger.error.bind(logger));
process.on('unhandledRejection', logger.error.bind(logger));
process.on('uncaughtExceptionMonitor', logger.error.bind(logger));
