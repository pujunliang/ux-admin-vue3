<template>
    <div class="table-box">
        <ProTable
            ref="proTable"
            :columns="columns"
            :request-api="request"
            :init-param="initParam"
            :data-callback="dataCallback"
            :search-label-width="100"
            search-label-position="right"
            @darg-sort="sortTable">
            <!-- 表格 header 按钮 -->
            <template #tableHeader="scope">
                <el-button
                    v-auth="'add'"
                    type="primary"
                    @click="openDrawer('新增')">
                    <i class="ri-add-line"></i>
                    &nbsp;新增用户
                </el-button>
                <el-button
                    v-auth="'export'"
                    type="primary"
                    plain
                    @click="downloadFile">
                    <i class="ri-download-line"></i>
                    &nbsp;导出用户数据
                </el-button>
                <el-button
                    type="primary"
                    plain
                    @click="toDetail">
                    <i class="ri-external-link-line"></i>
                    &nbsp;跳转详情页面
                </el-button>
                <el-button
                    type="danger"
                    plain
                    :disabled="!scope.isSelected"
                    @click="batchDelete(scope.selectedListIds)">
                    <i class="ri-delete-bin-line"></i>
                    &nbsp;批量删除用户
                </el-button>
            </template>
            <!-- Expand -->
            <template #expand="scope">
                <span class="detail">{{ scope.row }}</span>
            </template>
            <!-- usernameHeader -->
            <template #usernameHeader="scope">
                <el-button
                    type="primary"
                    @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
                    {{ scope.column.label }}
                </el-button>
            </template>
            <!-- createTime -->
            <template #createTime="scope">
                <el-button
                    type="primary"
                    link
                    @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
                    {{ scope.row.createTime }}
                </el-button>
            </template>
            <!-- 表格操作 -->
            <template #operation="scope">
                <el-button
                    type="primary"
                    link
                    @click="openDrawer('查看', scope.row)">
                    <i class="ri-eye-line"></i>
                    &nbsp;查看
                </el-button>
                <el-button
                    type="primary"
                    link
                    @click="openDrawer('编辑', scope.row)">
                    <i class="ri-edit-2-line"></i>
                    &nbsp;编辑
                </el-button>
                <el-button
                    type="primary"
                    link
                    @click="deleteAccount(scope.row)">
                    <i class="ri-delete-bin-line"></i>
                    &nbsp;删除
                </el-button>
            </template>
        </ProTable>
        <UserDrawer ref="drawerRef" />
        <ImportExcel ref="dialogRef" />
    </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { User } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useDownload } from "@/hooks/useDownload";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { ProTableInstance } from "@/components/ProTable/interface";
import { getUserList, deleteUser, editUser, addUser, exportUserInfo } from "@/api/modules/user";
import { useColumns } from "./columns";
const router = useRouter();

/**
 * 跳转详情页
 */
const toDetail = () => {
    router.push(`/proTable/useProTable/detail/${Math.random().toFixed(3)}?params=detail-page`);
};

// ProTable 实例
const proTable = ref<ProTableInstance>();

const { columns } = useColumns(proTable);

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ type: 1 });

/**
 * dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，可以在这里进行处理成这些字段
 * 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
 * @param data
 */
const dataCallback = (data: any) => {
    return {
        list: data.list,
        total: data.total,
        pageNum: data.pageNum,
        pageSize: data.pageSize
    };
};

/**
 * 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
 * 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
 * @param params
 */
const request = (params: any) => {
    let newParams = JSON.parse(JSON.stringify(params));
    newParams.createTime && (newParams.startTime = newParams.createTime[0]);
    newParams.createTime && (newParams.endTime = newParams.createTime[1]);
    delete newParams.createTime;
    return getUserList(newParams);
};

/**
 * 表格拖拽排序
 * @param param0
 */
const sortTable = ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
    console.log(newIndex, oldIndex);
    console.log(proTable.value?.tableData);
    ElMessage.success("修改列表排序成功");
};

/**
 * 删除用户信息
 * @param params
 */
const deleteAccount = async (params: User.ResUserList) => {
    await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
    proTable.value?.getTableList();
};

/**
 * 批量删除用户信息
 * @param id
 */
const batchDelete = async (id: string[]) => {
    await useHandleData(deleteUser, { id }, "删除所选用户信息");
    proTable.value?.clearSelection();
    proTable.value?.getTableList();
};

/**
 * 导出用户列表
 */
const downloadFile = async () => {
    let tempName: string = "用户列表";
    let searchParam = proTable.value?.searchParam;
    ElMessageBox.confirm("确认导出用户数据?", "温馨提示", {
        type: "warning",
        autofocus: false
    }).then(() => useDownload(exportUserInfo, tempName, searchParam));
};

/**
 * 打开 drawer(新增、查看、编辑)
 */
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);
const openDrawer = (title: string, row: Partial<User.ResUserList> = {}) => {
    let api = title === "新增" ? addUser : title === "编辑" ? editUser : undefined;
    const params = {
        title,
        isView: title === "查看",
        row: { ...row },
        api,
        getTableList: proTable.value?.getTableList
    };
    drawerRef.value?.acceptParams(params);
};
</script>
<style lang="scss" scoped>
.detail {
    padding: 16px;
    display: block;
    letter-spacing: 0.5px;
    line-height: 20px;
    background: #f9f9f9;
    font-family: Consolas;
}
</style>
