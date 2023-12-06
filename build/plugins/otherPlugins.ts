import { createHtmlPlugin } from "vite-plugin-html";
import { PluginOption } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
import { viteMockServe } from "vite-plugin-mock";
import { prismjsPlugin } from "vite-plugin-prismjs";

/**
 * 注入变量到 html 文件
 * @param appTitle
 * @returns
 */
export const htmlPlugin = (viteEnv: ViteEnv): PluginOption => {
    const { VITE_GLOB_APP_TITLE } = viteEnv;
    const htmlPluginOption: any = {
        inject: {
            data: { title: VITE_GLOB_APP_TITLE }
        }
    };
    return createHtmlPlugin(htmlPluginOption);
};

/**
 * 视图分析插件
 * @param viteEnv
 * @returns rollup插件
 */
export const visualizerPlugin = (): any => {
    const visualizerPluginOption = {
        filename: "stats.html",
        gzipSize: true,
        brotliSize: true
    };

    return visualizer(visualizerPluginOption);
};

/**
 * @description VitePwa
 * @param viteEnv
 */
export const pwaPlugin = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
    const { VITE_GLOB_APP_TITLE } = viteEnv;
    return VitePWA({
        registerType: "autoUpdate",
        manifest: {
            name: VITE_GLOB_APP_TITLE,
            short_name: VITE_GLOB_APP_TITLE,
            theme_color: "#ffffff",
            icons: [
                {
                    src: "/logo.png",
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: "/logo.png",
                    sizes: "512x512",
                    type: "image/png"
                },
                {
                    src: "/logo.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any maskable"
                }
            ]
        }
    });
};

/**
 * 数据模拟插件
 * @param isBuild
 * @returns
 */
export const mockPlugin = (isBuild: boolean): PluginOption | PluginOption[] => {
    return viteMockServe({
        mockPath: "mock",
        localEnabled: true,
        prodEnabled: !isBuild ? false : true //生产环境下为false，这样就不会打包到生产包中
    });
};

/**
 * 代码高亮
 */
export const highlightPlugin = (): PluginOption | PluginOption[] => {
    // 1、line-numbers显示行数
    // 2、show-language显示语言
    // 3、copy-to-clipboard显示语言
    // 4、'inline-color'在代码中显示颜色块
    return prismjsPlugin({
        languages: "all", // 语言
        plugins: ["line-numbers", "show-language", "copy-to-clipboard", "inline-color"],
        theme: "coy", // 主题
        css: true
    });
};
