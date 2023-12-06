export const columnScopeSlotCode = `<!-- 使用作用域插槽自定义单元格内容 username -->
<template #username="scope">
    {{ scope.row.username }}
</template>

<!-- 使用作用域插槽自定义表头内容 username -->
<template #usernameHeader="scope">
    <el-button type="primary" @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
        {{ scope.column.label }}
    </el-button>
</template>`;
