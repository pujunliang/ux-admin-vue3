<template>
    <div class="login-container flx-center">
        <div class="login-box">
            <SwitchDark class="dark" />
            <div class="login-form">
                <div class="login-logo">
                    <img
                        class="login-icon"
                        src="@/assets/images/logo.png"
                        alt="" />
                    <h2 class="logo-text">UX Admin</h2>
                </div>
                <div class="desc">高效、全面的企业级快速开发平台</div>
                <LoginForm />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="login">
import LoginForm from "./components/LoginForm.vue";
import { SwitchDark } from "@/components";
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
