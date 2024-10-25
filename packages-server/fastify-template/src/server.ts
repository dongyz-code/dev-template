import { join } from 'path';
import Fastify from 'fastify';
import { fastifyAutoload } from '@fastify/autoload';
import { Env } from '@/config/index.js';
import { fastifyLogger, logger } from '@/plugins/logger.js';
import { getESDirname } from '@/utils/dir.js';

const __dirname = getESDirname(import.meta.url);

const app = Fastify({
  logger: fastifyLogger,
});

app.register(fastifyAutoload, {
  dir: join(__dirname, 'modules'),
  scriptPattern: /\.route\.(js|ts)$/,
  dirNameRoutePrefix: false,
  options: {
    prefix: '/api',
  },
});

app.listen({ port: Env.SERVER_PORT }, (err, address) => {
  console.log(app.printRoutes());

  if (err) {
    logger.error(err);
    process.exit(1);
  }
});

process.on('uncaughtException', logger.error.bind(logger));
process.on('unhandledRejection', logger.error.bind(logger));
process.on('uncaughtExceptionMonitor', logger.error.bind(logger));
