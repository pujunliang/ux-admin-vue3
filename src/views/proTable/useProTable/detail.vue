<template>
    <div class="detail-container">
        <el-descriptions
            title="ProTable 详情页"
            direction="vertical"
            :column="4"
            border>
            <el-descriptions-item label="姓名">kooriookami</el-descriptions-item>
            <el-descriptions-item label="电话号码">18100000000</el-descriptions-item>
            <el-descriptions-item
                label="所在地"
                :span="2">
                Suzhou
            </el-descriptions-item>
            <el-descriptions-item label="备注">
                <el-tag size="small">School</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="地址">
                No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
            </el-descriptions-item>
        </el-descriptions>

        <el-descriptions
            title="基础信息"
            :column="4"
            direction="vertical"
            style="margin-top: 28px">
            <el-descriptions-item label="姓名">kooriookami</el-descriptions-item>
            <el-descriptions-item label="电话号码">18100000000</el-descriptions-item>
            <el-descriptions-item
                label="所在地"
                :span="2">
                Suzhou
            </el-descriptions-item>
            <el-descriptions-item label="备注">
                <el-tag size="small">School</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="地址">
                No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script setup lang="ts" name="useProTableDetail"></script>

<style scoped>
.detail-container {
    background-color: rgb(255, 255, 255);
    height: calc(100% - 20px);
    padding: 16px;
}
</style>
