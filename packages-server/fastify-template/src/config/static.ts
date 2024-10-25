import { resolve } from 'path';
import { getESDirname } from '@/utils/index.js';

const __dirname = getESDirname(import.meta.url);

export const SERVER_DIR = resolve(__dirname, '../../');

export const STATIC_DIR = resolve(SERVER_DIR, 'static');

export const LOG_DIR = resolve(STATIC_DIR, 'logs');
