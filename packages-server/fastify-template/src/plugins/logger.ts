import { getLogger } from '@/utils/logger';
import { LOG_DIR } from '@/config';

/**
 * 通用logger
 */
export const logger = getLogger('app', {
  logDir: LOG_DIR,
});

/**
 * fastify logger
 */
export const fastifyLogger = getLogger('fastify', {
  logDir: LOG_DIR,
});
