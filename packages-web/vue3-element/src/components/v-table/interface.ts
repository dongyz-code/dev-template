import type { RendererNode } from 'vue';
import type { BeString } from '@/types';

export interface VTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  data: T[];
  columns: VTableColumn<T>[];
  rowKey: string;
  height?: string | number;
  maxHeight?: string | number;
  selectedPage?: boolean;
}

export interface VTableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  title: string;
  key?: BeString<keyof T>;
  type?: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (row: T, index: number) => RendererNode;
  headerRender?: () => RendererNode;
  expandable?: boolean;
  expandRender?: (row: T, index: number) => RendererNode;
  fixed?: 'left' | 'right';
}
