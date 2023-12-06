import vue from "@vitejs/plugin-vue";
import { PluginOption } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import createSvgIcon from "./svg-icon";
import createCompression from "./compression";
import createSetupExtend from "./setup-extend";
import { htmlPlugin, visualizerPlugin, pwaPlugin, mockPlugin, highlightPlugin } from "./otherPlugins";
/**
 * 创建 vite 插件
 * @param viteEnv
 */
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean = false): (PluginOption | PluginOption[])[] {
    // const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_PWA } = viteEnv;

    const vitePlugins: Array<PluginOption> = [];
    vitePlugins.push(vue());
    vitePlugins.push(vueJsx());
    vitePlugins.push(createSetupExtend());
    vitePlugins.push(createSvgIcon(isBuild));
    isBuild && vitePlugins.push(...createCompression(viteEnv));

    // html
    vitePlugins.push(htmlPlugin(viteEnv));
    //visual
    vitePlugins.push(visualizerPlugin());
    //pwa
    vitePlugins.push(pwaPlugin(viteEnv));
    //mock
    vitePlugins.push(mockPlugin(isBuild));
    // code highlight
    vitePlugins.push(highlightPlugin());
    // //styleImport
    // // vitePlugins.push(createStylePlugin());
    return vitePlugins;
}
