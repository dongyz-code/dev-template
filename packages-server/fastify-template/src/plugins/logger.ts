import { getLogger } from '@/utils/logger';
import { logDir } from '@/config';

export const logger = getLogger('app', {
  logDir,
});

export const fastifyLogger = getLogger('fastify', {
  logDir,
});
