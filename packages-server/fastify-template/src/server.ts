import Fastify from 'fastify';
import { Env } from '@/config/index.js';
import { fastifyLogger, logger } from '@/plugins/logger.js';

const app = Fastify({
  logger: fastifyLogger,
});

app.listen({ port: Env.SERVER_PORT }, (err, address) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
});

process.on('uncaughtException', logger.error.bind(logger));
process.on('unhandledRejection', logger.error.bind(logger));
process.on('uncaughtExceptionMonitor', logger.error.bind(logger));
