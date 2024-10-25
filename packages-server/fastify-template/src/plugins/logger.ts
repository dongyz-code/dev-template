import { getLogger } from '@/utils/logger.js';
import { LOG_DIR } from '@/config/index.js';

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

/**
 * 数据库logger
 */
export const dbLogger = getLogger('db', {
  logDir: LOG_DIR,
});
