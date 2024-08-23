<template>
  <el-table ref="tableRef" :data="data" :row-key="rowKey" :height="height" :max-height="maxHeight">
    <!-- check -->
    <el-table-column v-if="selectedKeys" width="50" align="center">
      <template #default="{ row }">
        <el-checkbox :checked="selectedMap[row[rowKey]]" @change="onSelectedRow($event, row[rowKey])"></el-checkbox>
      </template>
      <template #header v-if="selectedPage">
        <el-checkbox v-bind="headerSelected" @change="onSelectedPage($event, currentPageIds)"></el-checkbox>
      </template>
    </el-table-column>

    <!-- columns -->
    <template v-for="column in columns">
      <el-table-column
        :prop="column.key"
        :width="column.width"
        :label="column.title"
        :type="column.type"
        :align="column.align"
      >
        <template v-if="column.render" #default="{ row, $index }">
          <jsx-render :nodes="column.render(row, $index)" />
        </template>

        <template v-if="column.headerRender" #header>
          <jsx-render :nodes="column.headerRender()" />
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts" generic="T extends Record<string, unknown>">
import { computed, ref } from 'vue';
import JsxRender from '../jsx-render';
import { useTableSelected } from './useTableSelected';

import type { CommonKey } from '@/types/common';
import type { VTableProps } from './interface';
import type { ElTable } from 'element-plus';

const tableRef = ref<InstanceType<typeof ElTable>>();

const props = withDefaults(defineProps<VTableProps<T>>(), {
  data: () => [],
  columns: () => [],
  selectedPage: () => true,
});
const emits = defineEmits(['update:columns']);

const selectedKeys = defineModel<CommonKey[]>('selectedKeys', { default: () => [] });
const currentPageIds = computed(() => props.data.map((item) => item[props.rowKey] as CommonKey));

const { selectedMap, headerSelected, onSelectedPage, onSelectedRow } = useTableSelected(selectedKeys, currentPageIds);
</script>

<style lang="scss" scoped></style>
