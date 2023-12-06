<template>
    <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        size="large">
        <el-form-item prop="username">
            <el-input
                v-model="loginForm.username"
                placeholder="用户名：admin / user">
                <template #prefix>
                    <i class="ri-user-fill"></i>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="密码：123456"
                show-password
                autocomplete="new-password">
                <template #prefix>
                    <i class="ri-lock-2-fill"></i>
                </template>
            </el-input>
        </el-form-item>
    </el-form>
    <div class="login-btn">
        <el-button
            size="large"
            @click="resetForm(loginFormRef)">
            <i class="ri-refresh-line"></i>
            重置
        </el-button>
        <el-button
            size="large"
            type="primary"
            :loading="loading"
            @click="login(loginFormRef)">
            <i class="ri-login-box-line"></i>
            登录
        </el-button>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config";
import { getTimeState } from "@/utils";
import { Login } from "@/api/interface";
import { ElNotification } from "element-plus";
import { loginApi } from "@/api/modules/login";
import { useUserStore } from "@/stores/modules/user";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { initDynamicRouter } from "@/router/modules/dynamicRouter";
import type { ElForm } from "element-plus";
import md5 from "md5";
const router = useRouter();
const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();

type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loading = ref(false);
const loginForm = reactive<Login.ReqLoginForm>({
    username: "admin",
    password: "111111"
});

// login
const login = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async valid => {
        if (!valid) return;
        loading.value = true;
        try {
            // 1.执行登录接口
            const { data } = await loginApi({ ...loginForm, password: md5(loginForm.password) });
            userStore.setToken(data.access_token);

            // 2.添加动态路由
            await initDynamicRouter();

            // 3.清空 tabs、keepAlive 数据
            tabsStore.setTabs([]);
            keepAliveStore.setKeepAliveName([]);
            // 4.跳转到首页
            router.push(HOME_URL);
            ElNotification({
                title: getTimeState(),
                message: "欢迎登录 Ux-Admin",
                type: "success",
                duration: 3000
            });
        } finally {
            loading.value = false;
        }
    });
};

// resetForm
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

onMounted(() => {
    // 监听 enter 事件（调用登录）
    document.onkeydown = (e: KeyboardEvent) => {
        e = (window.event as KeyboardEvent) || e;
        if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
            if (loading.value) return;
            login(loginFormRef.value);
        }
    };
});
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
