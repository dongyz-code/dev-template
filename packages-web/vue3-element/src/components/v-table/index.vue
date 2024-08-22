<template>
  <el-table ref="tableRef" :data="data" :row-key="rowKey" :height="height" :max-height="maxHeight">
    <!-- check -->
    <el-table-column v-if="selectedKeys" width="50" align="center">
      <template #default="{ row, $index }">
        <el-checkbox :checked="selectedMap[row[rowKey]]" @change="onSelected($event, row)"> </el-checkbox>
      </template>
      <template #header v-if="selectedPage">
        <el-checkbox v-bind="pageSelected" @change="onSelectPage"></el-checkbox>
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
import { computed, reactive, ref } from 'vue';
import { CheckboxValueType, type ElTable } from 'element-plus';
import { VTableProps } from './interface';
import JsxRender from '../jsx-render';
import { arrObject } from '@/utils/array';

const tableRef = ref<InstanceType<typeof ElTable>>();

const props = withDefaults(defineProps<VTableProps<T>>(), {
  data: () => [],
  columns: () => [],
  selectedPage: () => true,
});
const emits = defineEmits(['update:columns']);

const pageSelected = reactive({
  checked: true,
  indeterminate: true,
});
const selectedKeys = defineModel<string[]>('selectedKeys', {});
const selectedMap = computed(() => arrObject(selectedKeys.value));

/** 选中行 */
const onSelected = (val: CheckboxValueType, row: T) => {
  if (!selectedKeys) return;
  const id = row[props.rowKey] as string;

  if (val === true) {
    selectedKeys.value?.push(id);
  } else if (val === false) {
    selectedKeys.value = selectedKeys.value?.filter((i) => i !== id) || [];
  }
};

/** 选中当前页 */
const onSelectPage = (val: CheckboxValueType) => {
  if (!selectedKeys) return;

  const currentIdMap = arrObject(props.data, props.rowKey, true);

  if (val === true) {
    let _selected: string[] = [];
    _selected = selectedKeys.value?.filter((i) => !currentIdMap[i]) || [];
    _selected.push(...Object.keys(currentIdMap));
    selectedKeys.value = _selected;
  } else if (val === false) {
    selectedKeys.value = selectedKeys.value?.filter((i) => currentIdMap[i]) || [];
  }
};
</script>

<style lang="scss" scoped></style>
