<template>
  <div class="home">
    <v-table v-model:selected-keys="selected" :data="currentPageData" row-key="user_id" :columns="columns"></v-table>
    <el-pagination
      :current-page="page.current"
      :page-size="page.pageSize"
      :total="data.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { data, columns } from './constant.tsx';

const page = reactive({
  current: 1,
  pageSize: 10,
});

const currentPageData = computed(() => {
  return data.slice((page.current - 1) * page.pageSize, page.current * page.pageSize);
});

const selected = ref([]);

const handleSizeChange = (size: number) => {
  page.pageSize = size;
  page.current = 1;
};

const handleCurrentChange = (currentPage: number) => {
  page.current = currentPage;
};

watch(selected, (newVal) => {
  console.log(newVal);
});
</script>

<style lang="scss" scoped>
.home {
  width: 60%;
  margin: 100px auto;
}
</style>
