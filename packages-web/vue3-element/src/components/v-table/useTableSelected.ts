import { computed, Ref, ComputedRef, ref, watch } from 'vue';
import { arrObject } from '@/utils/array';

import type { CommonKey } from '@/types/common';
import type { CheckboxValueType } from 'element-plus';
import type { VTableProps } from './interface';

export const useTableSelected = ({
  selected,
  currentPageIds,
  onSelectedAllChange,
}: {
  selected: Ref<CommonKey[]>;
  currentPageIds: Ref<CommonKey[]> | ComputedRef<CommonKey[]>;
  onSelectedAllChange?: VTableProps['onSelectedAllChange'];
}) => {
  const selectedAll = ref(false);
  const selectedAllLoading = ref(false);
  const selectedMap = computed(() => arrObject(selected.value));

  const headerSelected = computed(() => {
    const checked = !!selected.value.length;
    const indeterminate = checked && !currentPageIds.value.every((i) => selectedMap.value[i]);

    return {
      indeterminate,
      checked,
    };
  });

  /** 选中单行 */
  const onSelectedRow = (val: CheckboxValueType, key: CommonKey) => {
    if (val === true) {
      selected.value?.push(key);
    } else if (val === false) {
      selected.value = selected.value?.filter((i) => i !== key) || [];
    }
  };

  /** 选中当前页 */
  const onSelectedPage = (val: CheckboxValueType, ids: CommonKey[]) => {
    const idMap = arrObject(ids);
    const needSelected = ids.filter((i) => !selectedMap.value[i]);

    if (val === true) {
      selected.value?.push(...needSelected);
    } else if (val === false) {
      selected.value = selected.value?.filter((i) => !idMap[i]) || [];
    }
  };

  /** 跨分页全选 */
  const onSelectedAll = async (val: CheckboxValueType) => {
    if (onSelectedAllChange! instanceof Function) {
      return;
    }

    selectedAllLoading.value = true;
    try {
      selected.value = await onSelectedAllChange!(val);
    } catch (error) {
      throw error;
    } finally {
      selectedAllLoading.value = false;
    }
  };

  watch(selectedAll, async (val) => {
    await onSelectedAll(val);
  });

  return {
    selectedMap,
    headerSelected,

    /** 跨分页全选 */
    selectedAll,
    selectedAllLoading,

    onSelectedRow,
    onSelectedPage,
    onSelectedAll,
  };
};
