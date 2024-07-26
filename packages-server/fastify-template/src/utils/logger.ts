import pino from 'pino';
import pretty from 'pino-pretty';
import { stdout } from 'process';
import { createStream } from 'rotating-file-stream';

export type LoggerName = 'app' | 'db' | 'fastify';

const defaultOptions: pino.LoggerOptions = {
  level: 'info',
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
};

export function getLogger(
  name: string,
  options: {
    logDir: string;
  },
  pinoOptions?: pino.LoggerOptions
): pino.Logger {
  const { logDir } = options;
  const stream = createStream(`server.log`, {
    size: '10M',
    interval: '1d',
    path: logDir,
  });

  const targets: pino.StreamEntry[] = [{ level: 'info', stream: stream }];

  if (process.env.NODE_ENV === 'dev') {
    targets.push({
      level: 'info',
      stream: pretty({}),
    });
  } else {
    targets.push({
      level: 'error',
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
