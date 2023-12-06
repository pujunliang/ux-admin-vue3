<template>
    <el-dropdown
        trigger="click"
        :teleported="false">
        <div class="more-button">
            <i class="ri-arrow-down-s-line"></i>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="refresh">
                    <el-icon>
                        <i class="ri-refresh-line"></i>
                    </el-icon>
                    {{ $t("tabs.refresh") }}
                </el-dropdown-item>
                <el-dropdown-item @click="maximize">
                    <el-icon>
                        <i class="ri-fullscreen-line"></i>
                    </el-icon>
                    {{ $t("tabs.maximize") }}
                </el-dropdown-item>
                <el-dropdown-item
                    divided
                    @click="closeCurrentTab">
                    <el-icon>
                        <i class="ri-indeterminate-circle-line"></i>
                    </el-icon>
                    {{ $t("tabs.closeCurrent") }}
                </el-dropdown-item>
                <el-dropdown-item @click="tabStore.closeTabsOnSide(route.fullPath, 'left')">
                    <el-icon>
                        <i class="ri-arrow-left-double-line"></i>
                    </el-icon>
                    {{ $t("tabs.closeLeft") }}
                </el-dropdown-item>
                <el-dropdown-item @click="tabStore.closeTabsOnSide(route.fullPath, 'right')">
                    <el-icon>
                        <i class="ri-arrow-right-double-line"></i>
                    </el-icon>
                    {{ $t("tabs.closeRight") }}
                </el-dropdown-item>
                <el-dropdown-item
                    divided
                    @click="tabStore.closeMultipleTab(route.fullPath)">
                    <el-icon>
                        <i class="ri-close-circle-line"></i>
                    </el-icon>
                    {{ $t("tabs.closeOther") }}
                </el-dropdown-item>
                <el-dropdown-item @click="closeAllTab">
                    <el-icon>
                        <i class="ri-folder-reduce-line"></i>
                    </el-icon>
                    {{ $t("tabs.closeAll") }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { nextTick, inject } from "vue";
import { HOME_URL } from "@/config";
import { useTabsStore } from "@/stores/modules/tabs";
import { useGlobalStore } from "@/stores/modules/global";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const tabStore = useTabsStore();
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();

// refresh current page
const refreshCurrentPage: Function = inject("refresh") as Function;
const refresh = () => {
    setTimeout(() => {
        keepAliveStore.removeKeepAliveName(route.name as string);
        refreshCurrentPage(false);
        nextTick(() => {
            keepAliveStore.addKeepAliveName(route.name as string);
            refreshCurrentPage(true);
        });
    }, 0);
};

// maximize current page
const maximize = () => {
    globalStore.setGlobalState("maximize", true);
};

// Close Current
const closeCurrentTab = () => {
    if (route.meta.isAffix) return;
    tabStore.removeTabs(route.fullPath);
};

// Close All
const closeAllTab = () => {
    tabStore.closeMultipleTab();
    router.push(HOME_URL);
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
