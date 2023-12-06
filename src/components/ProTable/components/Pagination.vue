<template>
    <!-- 分页组件 -->
    <el-pagination
        background
        :current-page="Number(props.pageable.pageNum)"
        :page-size="Number(props.pageable.pageSize)"
        :page-sizes="pageSizes"
        :total="Number(props.pageable.total)"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"></el-pagination>
</template>

<script setup lang="ts" name="Pagination">
interface Pageable {
    pageNum: number;
    pageSize: number;
    total: number;
}

interface PaginationProps {
    pageable: Pageable;
    handleSizeChange: (size: number) => void;
    handleCurrentChange: (currentPage: number) => void;
}

const props = withDefaults(defineProps<PaginationProps>(), {
    pageable: () => ({
        pageNum: 0,
        pageSize: 0,
        total: 0
    })
});

const pageSizes: number[] = [25, 50, 100, 150];
</script>
