import path from "path";
import pino from "pino";
import pretty from "pino-pretty";
import { stdout } from "process";
import { createStream } from "rotating-file-stream";

export type LoggerName = "app" | "db" | "fastify";

const defaultOptions: pino.LoggerOptions = {
  level: "info",
  timestamp: () => `,"time":"${new Date(1591862400000).toISOString()}"`,
};

export function getLogger(
  name: string,
  options: {
    logDir: string;
  },
  pinoOptions?: pino.LoggerOptions
): pino.Logger {
  const { logDir } = options;
  const logFile = path.resolve(logDir, `${name}.log`);
  const stream = createStream(logFile, {
    size: "10M",
    interval: "1d",
    compress: "gzip",
  });

  const targets: pino.StreamEntry[] = [{ level: "info", stream: stream }];

  if (process.env.NODE_ENV === "dev") {
    targets.push({
      level: "info",
      stream: pretty({}),
    });
  } else {
    targets.push({
      level: "error",
      stream: stdout,
    });
  }

  const logger = pino(
    {
      ...defaultOptions,
      name: name,
      ...pinoOptions,
    },
    pino.multistream(targets)
  );

  return logger;
}
