import { stdout } from 'process';
import { resolve } from 'path';
import { pino } from 'pino';
import dayjs from 'dayjs';
import fse from 'fs-extra';
import pretty from 'pino-pretty';
import { createStream } from 'rotating-file-stream';

export type LoggerName = 'app' | 'db' | 'fastify';

const defaultOptions: pino.LoggerOptions = {
  level: 'info',
  timestamp: true,
};

/**
 * 获取日志记录器
 * @param name - 日志记录器名称
 * @param options - 日志记录器配置
 * @param pinoOptions - pino 配置
 * @returns 日志记录器
 */
export function getLogger(
  name: string,
  options: {
    logDir: string;
  },
  pinoOptions?: pino.LoggerOptions
): pino.Logger {
  const { logDir } = options;

  function generateLoggerName(time: number | Date, index?: number) {
    if (!time) {
      time = new Date();
    }

    let end = '';
    if (typeof index == 'number') {
      end = `_${index}`;
    }

    const dir = resolve(logDir, `${dayjs(time).format('YYYY-MM-DD')}`);
    fse.ensureDirSync(dir);
    return `/${dayjs(time).format('YYYY-MM-DD')}/${name}${end}.log`;
  }

  const stream = createStream(generateLoggerName, {
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
