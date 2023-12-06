export const proTableCode = `<template>
    <el-table
      ref="tableRef"
      v-bind="$attrs"
    >
    </el-table>
</template>

<script setup lang="ts" name="ProTable">
import { ref } from "vue";
import { ElTable } from "element-plus";

const tableRef = ref<InstanceType<typeof ElTable>>();

defineExpose({ element: tableRef });`;
