<template>
    <div class="main-box">
        <TreeFilter
            title="部门列表(多选)"
            multiple
            label="name"
            :request-api="getUserDepartment"
            :default-value="treeFilterValues.departmentId"
            @change="changeTreeFilter" />
        <div class="table-box">
            <div class="card mb10 pt0 pb0">
                <SelectFilter
                    :data="selectFilterData"
                    :default-values="selectFilterValues"
                    @change="changeSelectFilter" />
            </div>
            <ProTable
                ref="proTable"
                highlight-current-row
                :columns="columns"
                :request-api="getUserList"
                :search-label-width="100"
                search-label-position="right"
                :init-param="Object.assign(treeFilterValues, selectFilterValues)">
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
                        @click="setCurrent">
                        <i class="ri-radio-button-line"></i>
                        &nbsp;选中第四行
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
<script setup lang="ts" name="useSelectFilter">
import { ref, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import { User } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { getGenderStatus, getUserStatus } from "../utils";
import ProTable from "@/components/ProTable/index.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import SelectFilter from "@/components/SelectFilter/index.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { getUserList, deleteUser, editUser, addUser, getUserDepartment } from "@/api/modules/user";
import { genderRender, statusRender } from "../render";
// ProTable 实例
const proTable = ref<ProTableInstance>();

// 表格配置项
const columns = reactive<ColumnProps<User.ResUserList>[]>([
    { type: "radio", label: "单选", width: 60 },
    { type: "index", label: "#", width: 80 },
    { prop: "username", label: "用户姓名", width: 120 },
    { prop: "gender", label: "性别", width: 120, sortable: true, enum: getGenderStatus(), render: genderRender },
    { prop: "idCard", label: "身份证号" },
    { prop: "email", label: "邮箱" },
    { prop: "address", label: "居住地址" },
    {
        prop: "status",
        label: "用户状态",
        width: 120,
        sortable: true,
        tag: true,
        enum: getUserStatus(),
        render: scope => {
            return statusRender(scope, false, null);
        }
    },
    { prop: "createTime", label: "创建时间", width: 180, sortable: true },
    { prop: "operation", label: "操作", width: 230, fixed: "right" }
]);

// selectFilter 数据（用户角色为后台数据）
const selectFilterData = reactive([
    {
        title: "用户状态(单)",
        key: "workStatus",
        options: [
            { label: "全部", value: "" },
            { label: "在职", value: "1", icon: "ri-user-line" },
            { label: "待培训", value: "2", icon: "ri-notification-line" },
            { label: "待上岗", value: "3", icon: "ri-time-line" },
            { label: "已离职", value: "4", icon: "ri-close-circle-line" },
            { label: "已退休", value: "5", icon: "ri-check-line" }
        ]
    },
    {
        title: "用户角色(多)",
        key: "userRole",
        multiple: true,
        options: []
    }
]) as any;

// // 获取用户角色字典
// onMounted(() => getUserRoleDict());
// const getUserRoleDict = async () => {
//     // const { data } = await getUserRole();
//     // selectFilterData[1].options = data as any;
// };

// 默认 selectFilter 参数
const selectFilterValues = ref({ userStatus: "2", userRole: ["1", "3"] });
const changeSelectFilter = (value: typeof selectFilterValues.value) => {
    ElMessage.success("请注意查看请求参数变化 🤔");
    proTable.value!.pageable.pageNum = 1;
    selectFilterValues.value = value;
};

// 默认 treeFilter 参数
const treeFilterValues = reactive({ departmentId: ["11"] });
const changeTreeFilter = (val: string[]) => {
    ElMessage.success("请注意查看请求参数变化 🤔");
    proTable.value!.pageable.pageNum = 1;
    treeFilterValues.departmentId = val;
};

// 选择行
const setCurrent = () => {
    proTable.value!.radio = proTable.value?.tableData[3].id;
    proTable.value?.element?.setCurrentRow(proTable.value?.tableData[3]);
};

watch(
    () => proTable.value?.radio,
    () => proTable.value?.radio && ElMessage.success(`选中 id 为【${proTable.value?.radio}】的数据`)
);

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
    await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
    proTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);
const openDrawer = (title: string, row: Partial<User.ResUserList> = {}) => {
    const params = {
        title,
        isView: title === "查看",
        row: { ...row },
        api: title === "新增" ? addUser : title === "编辑" ? editUser : undefined,
        getTableList: proTable.value?.getTableList
    };
    drawerRef.value?.acceptParams(params);
};
</script>
