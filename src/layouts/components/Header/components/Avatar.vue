<template>
    <el-dropdown trigger="click">
        <el-avatar
            :size="25"
            class="avatar">
            <i class="ri-user-3-fill"></i>
        </el-avatar>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="openDialog('infoRef')">
                    <el-icon><i class="ri-user-line"></i></el-icon>
                    {{ $t("header.personalData") }}
                </el-dropdown-item>
                <el-dropdown-item @click="openDialog('passwordRef')">
                    <el-icon><i class="ri-lock-2-line"></i></el-icon>
                    {{ $t("header.changePassword") }}
                </el-dropdown-item>
                <el-dropdown-item
                    divided
                    @click="logout">
                    <el-icon><i class="ri-shut-down-line"></i></el-icon>
                    {{ $t("header.logout") }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <!-- infoDialog -->
    <InfoDialog ref="infoRef"></InfoDialog>
    <!-- passwordDialog -->
    <PasswordDialog ref="passwordRef"></PasswordDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LOGIN_URL } from "@/config";
import { useRouter } from "vue-router";
import { logoutApi } from "@/api/modules/login";
import { useUserStore } from "@/stores/modules/user";
import { ElMessageBox, ElMessage } from "element-plus";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";

const router = useRouter();
const userStore = useUserStore();

// 退出登录
const logout = () => {
    ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(async () => {
        // 1.执行退出登录接口
        await logoutApi();

        // 2.清除 Token
        userStore.setToken("");

        // 3.重定向到登陆页
        router.replace(LOGIN_URL);
        ElMessage.success("退出登录成功！");
    });
};

// 打开修改密码和个人信息弹窗
const infoRef = ref<InstanceType<typeof InfoDialog> | null>(null);
const passwordRef = ref<InstanceType<typeof PasswordDialog> | null>(null);
const openDialog = (ref: string) => {
    if (ref == "infoRef") infoRef.value?.openDialog();
    if (ref == "passwordRef") passwordRef.value?.openDialog();
};
</script>

<style scoped lang="scss">
.avatar {
    background-color: #1a73e8;
    cursor: pointer;
}
</style>
