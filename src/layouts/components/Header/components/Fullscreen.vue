<template>
    <div class="fullscreen">
        <i
            :class="[isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line']"
            class="toolBar-icon"
            @click="handleFullScreen"></i>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import screenfull from "screenfull";

const isFullscreen = ref(screenfull.isFullscreen);

onMounted(() => {
    screenfull.on("change", () => {
        if (screenfull.isFullscreen) isFullscreen.value = true;
        else isFullscreen.value = false;
    });
});

const handleFullScreen = () => {
    if (!screenfull.isEnabled) ElMessage.warning("当前您的浏览器不支持全屏 ❌");
    screenfull.toggle();
};
</script>
