import { getLogger } from "@/utils/logger";
import { logDir } from "@/config";

export const logger = getLogger("app", {
  logDir,
});

export const fastifyLogger = getLogger("fastify", {
  logDir,
});

logger.debug("Hello, world!");
logger.info("Hello, world!");
logger.trace("Hello, world!");
logger.warn("Hello, world!");
logger.error("Hello, world!");
logger.fatal("Hello, world!");
