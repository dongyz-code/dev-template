import { computed, Ref, ComputedRef } from 'vue';
import { arrObject } from '@/utils/array';

import type { CommonKey } from '@/types/common';
import type { CheckboxValueType } from 'element-plus';

export const useTableSelected = (
  selected: Ref<CommonKey[]>,
  currentPageIds: Ref<CommonKey[]> | ComputedRef<CommonKey[]>
) => {
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

  return {
    selectedMap,
    headerSelected,
    onSelectedRow,
    onSelectedPage,
  };
};
