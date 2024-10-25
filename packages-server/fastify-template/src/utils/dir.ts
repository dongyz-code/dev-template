import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * 获取 ESM 模块的目录名
 * @param importMetaUrl - import.meta.url
 * @returns 目录名
 */
export function getESDirname(importMetaUrl: string): string {
  if (!importMetaUrl) {
    throw new Error('importMetaUrl 是必需的');
  }

  const __filename = fileURLToPath(importMetaUrl);
  return dirname(__filename);
}
