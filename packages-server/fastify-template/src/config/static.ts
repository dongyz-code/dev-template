import { resolve } from 'path';
import { readFileSync } from 'fs';
import fse from 'fs-extra';
import type { CONF } from '@/types';

export const SERVER_DIR = resolve(__dirname, '../../');

export const STATIC_DIR = resolve(SERVER_DIR, 'static');

export const LOG_DIR = resolve(STATIC_DIR, 'logs');

export const STATIC_CONF = (() => {
  const path = resolve(SERVER_DIR, '.conf/conf.json');

  if (!fse.existsSync(path)) {
    throw new Error('系统配置: 配置文件不存在');
  }
  const file = readFileSync(path, { encoding: 'utf-8' });
  const CONF: CONF = JSON.parse(file);

  if (!CONF.pg) {
    throw new Error('系统配置: 配置文件不正确');
  }
  return CONF;
})();
