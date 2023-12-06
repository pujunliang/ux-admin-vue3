<template>
    <div>
        <div class="card mb10">
            <h4 class="title">简介</h4>
            <span class="text">
                <el-link type="primary">Ux-Admin</el-link>
                一款基于 Vue3.3、TypeScript、Vite4、Pinia、remixIcon、Element-Plus
                开源的后台管理框架，使用目前最新技术栈开发。项目提供了表格、图表、主题配置等诸多强大功能，
                可在一定程度上提高您的开发效率。同时采用了极简、快速开发的思路进行搭建，满足不同项目快速开发需求。
                另外本项目还封装了一些常用组件、Hooks、指令、动态路由、按钮级别权限控制等功能。
            </span>
        </div>
        <div class="card mb10">
            <h4 class="title">生产环境依赖</h4>
            <el-descriptions
                :column="3"
                border>
                <el-descriptions-item
                    v-for="(value, key) in dependencies"
                    :key="key"
                    width="400px"
                    :label="key">
                    <el-tag type="info">
                        {{ value }}
                    </el-tag>
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="card">
            <h4 class="title">开发环境依赖</h4>
            <el-descriptions
                :column="3"
                border>
                <el-descriptions-item
                    v-for="(value, key) in devDependencies"
                    :key="key"
                    width="400px"
                    :label="key">
                    <el-tag type="info">
                        {{ value }}
                    </el-tag>
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script setup lang="ts" name="about">
const { pkg } = __APP_INFO__;
const { dependencies, devDependencies } = pkg;
</script>

<style lang="scss" scoped>
.card {
    font-family: "SF Pro SC", "SF Pro Display";
    .title {
        margin: 0 0 15px;
        font-size: 17px;
        font-weight: bold;
        color: var(--el-text-color-primary);
    }
    .text {
        font-size: 15px;
        line-height: 25px;
        color: var(--el-text-color-regular);
        .el-link {
            font-size: 15px;
        }
    }
}
:deep(.el-descriptions__body td) {
    font-family: "SF Pro SC", "SF Pro Display";
}
</style>
