<template>
    <el-icon
        class="collapse-icon"
        @click="changeCollapse">
        <i :class="[globalStore.isCollapse ? 'ri-menu-fold-fill' : 'ri-menu-unfold-fill']"></i>
    </el-icon>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/modules/global";

const globalStore = useGlobalStore();
const changeCollapse = () => globalStore.setGlobalState("isCollapse", !globalStore.isCollapse);
</script>

<style scoped lang="scss">
.collapse-icon {
    margin-right: 20px;
    font-size: 20px;
    top: 1px;
    color: var(--el-header-text-color);
    cursor: pointer;
}
</style>
