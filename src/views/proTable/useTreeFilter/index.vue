<template>
    <div class="main-box">
        <TreeFilter
            label="name"
            title="部门列表(单选)"
            :request-api="getUserDepartment"
            :default-value="initParam.departmentId"
            @change="changeTreeFilter" />
        <div class="table-box">
            <ProTable
                ref="proTable"
                :columns="columns"
                :request-api="getUserList"
                :init-param="initParam"
                :search-label-width="100"
                search-label-position="right"
                :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }">
                <!-- 表格 header 按钮 -->
                <template #tableHeader>
                    <el-button
                        type="primary"
                        @click="openDrawer('新增')">
                        <i class="ri-add-line"></i>
                        &nbsp;新增用户
                    </el-button>
                    <el-button
                        type="primary"
                        plain
                        @click="batchAdd">
                        <i class="ri-upload-line"></i>
                        &nbsp;批量添加用户
                    </el-button>
                    <el-button
                        type="primary"
                        plain
                        @click="downloadFile">
                        <i class="ri-download-line"></i>
                        &nbsp;导出用户数据
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
    </div>
</template>
<script setup lang="ts" name="useTreeFilter">
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { User } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useDownload } from "@/hooks/useDownload";
import ProTable from "@/components/ProTable/index.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { getUserList, deleteUser, editUser, addUser, getUserDepartment, exportUserInfo } from "@/api/modules/user";
import { getGenderStatus, getUserStatus, workStatusConfig } from "../utils";
import { genderRender } from "../render";

/* ProTable 实例 */
const proTable = ref<ProTableInstance>();

/* 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据) */
const initParam = reactive({ departmentId: "1" });

/* 树形筛选切换 */
const changeTreeFilter = (val: string) => {
    ElMessage.success("请注意查看请求参数变化 🤔");
    proTable.value!.pageable.pageNum = 1;
    initParam.departmentId = val;
};

/* 表格配置项 */
const columns = reactive<ColumnProps<User.ResUserList>[]>([
    { type: "index", label: "#", width: 80 },
    {
        prop: "username",
        label: "用户姓名",
        width: 120,
        search: {
            el: "input"
        }
    },
    {
        prop: "gender",
        label: "性别",
        width: 80,
        sortable: true,
        enum: getGenderStatus(),
        search: {
            el: "select"
        },
        fieldNames: {
            label: "genderLabel",
            value: "genderValue"
        },
        render: genderRender
    },
    { prop: "idCard", width: 150, label: "身份证号" },
    { prop: "email", width: 150, label: "邮箱" },
    { prop: "address", width: 150, label: "居住地址" },
    {
        prop: "status",
        label: "用户状态",
        width: 110,
        sortable: true,
        tag: true,
        enum: getUserStatus(),
        search: {
            el: "select"
        },
        fieldNames: {
            label: "userLabel",
            value: "userStatus"
        }
    },
    {
        prop: "workStatus",
        label: "工作状态",
        width: 120,
        render: scope => {
            return workStatusConfig[scope.row.workStatus].label;
        }
    },
    { prop: "createTime", label: "创建时间", width: 180 },
    { prop: "operation", label: "操作", width: 230, fixed: "right" }
]);

/* 删除用户信息 */
const deleteAccount = async (params: User.ResUserList) => {
    await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
    proTable.value?.getTableList();
};

/* 导出用户列表 */
const downloadFile = async () => {
    let tempName: string = "用户列表";
    let searchParam = proTable.value?.searchParam;
    ElMessageBox.confirm("确认导出用户数据?", "温馨提示", {
        type: "warning",
        autofocus: false
    }).then(() => useDownload(exportUserInfo, tempName, searchParam));
};

/* 批量添加用户 */
const dialogRef = ref<InstanceType<typeof ImportExcel> | null>(null);
const batchAdd = () => {
    const params = {
        title: "用户",
        tempApi: exportUserInfo,
        importApi: null, // 待写
        getTableList: proTable.value?.getTableList
    };
    dialogRef.value?.acceptParams(params);
};

/* 打开 drawer(新增、查看、编辑) */
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
