<script setup lang="ts">
import znCN from 'element-plus/es/locale/lang/zh-cn';
</script>

<template>
  <el-config-provider :locale="znCN">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
