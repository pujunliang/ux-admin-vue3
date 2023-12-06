<template>
    <div
        v-if="columns.length"
        class="card table-search">
        <el-form
            ref="formRef"
            :model="searchParam"
            :label-width="labelWidth"
            :label-position="labelPosition">
            <Grid
                ref="gridRef"
                :collapsed="collapsed"
                :gap="[20, 0]"
                :cols="searchCol">
                <GridItem
                    v-for="(item, index) in columns"
                    :key="item.prop"
                    v-bind="getResponsive(item)"
                    :index="index">
                    <el-form-item>
                        <template #label>
                            <el-space :size="4">
                                <span>{{ `${item.search?.label ?? item.label}` }}</span>
                                <el-tooltip
                                    v-if="item.search?.tooltip"
                                    effect="dark"
                                    :content="item.search?.tooltip"
                                    placement="top">
                                    <i :class="'iconfont icon-yiwen'"></i>
                                </el-tooltip>
                            </el-space>
                            <span>:</span>
                        </template>
                        <SearchFormItem
                            :column="item"
                            :search-param="searchParam" />
                    </el-form-item>
                </GridItem>
                <GridItem suffix>
                    <!-- padding-top: 30px; -->
                    <div
                        class="operation"
                        :style="operationStyle">
                        <el-button
                            type="primary"
                            @click="search">
                            <i class="ri-search-line"></i>
                            &nbsp;搜索
                        </el-button>
                        <el-button @click="reset">
                            <i class="ri-delete-bin-line"></i>
                            &nbsp;重置
                        </el-button>
                        <el-button
                            v-if="showCollapse"
                            type="primary"
                            link
                            class="search-isOpen"
                            @click="collapsed = !collapsed">
                            {{ collapsed ? "展开" : "合并" }}
                            <el-icon class="el-icon--right">
                                <i :class="[!collapsed ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line']"></i>
                            </el-icon>
                        </el-button>
                    </div>
                </GridItem>
            </Grid>
        </el-form>
    </div>
</template>
<script setup lang="ts" name="SearchForm">
import { computed, ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { BreakPoint } from "@/components/Grid/interface";
import SearchFormItem from "./components/SearchFormItem.vue";
import Grid from "@/components/Grid/index.vue";
import GridItem from "@/components/Grid/components/GridItem.vue";
import { EpPropMergeType } from "element-plus/es/utils/vue/props/types";
interface ProTableProps {
    columns?: ColumnProps[]; // 搜索配置列
    searchParam?: { [key: string]: any }; // 搜索参数
    searchCol: number | Record<BreakPoint, number>;
    search: (params: any) => void; // 搜索方法
    reset: (params: any) => void; // 重置方法,
    labelWidth?: number; // 文本宽度
    labelPosition?: EpPropMergeType<StringConstructor, "right" | "top" | "left", unknown>; // 文本位置 "right" | "top" | "left"
}

// 默认值
const props = withDefaults(defineProps<ProTableProps>(), {
    columns: () => [],
    searchParam: () => ({}),
    labelWidth: 100,
    labelPosition: "right"
});

const operationStyle = reactive({
    paddingTop: "0px"
});

if (props.labelPosition.toLowerCase() === "top") {
    operationStyle.paddingTop = "30px";
}
// 获取响应式设置
const getResponsive = (item: ColumnProps) => {
    return {
        span: item.search?.span,
        offset: item.search?.offset ?? 0,
        xs: item.search?.xs,
        sm: item.search?.sm,
        md: item.search?.md,
        lg: item.search?.lg,
        xl: item.search?.xl
    };
};

// 是否默认折叠搜索项
const collapsed = ref(true);

// 获取响应式断点
const gridRef = ref();
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint);

// 判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
    let show = false;
    props.columns.reduce((prev, current) => {
        prev +=
            (current.search![breakPoint.value]?.span ?? current.search?.span ?? 1) +
            (current.search![breakPoint.value]?.offset ?? current.search?.offset ?? 0);
        if (typeof props.searchCol !== "number") {
            if (prev >= props.searchCol[breakPoint.value]) show = true;
        } else {
            if (prev >= props.searchCol) show = true;
        }
        return prev;
    }, 0);
    return show;
});
</script>
