/*
 * @Author: junliang.pu
 * @Date: 2023-09-14 09:58:54
 * @LastEditors: junliang.pu
 * @LastEditTime: 2023-09-15 16:53:26
 * @Description: SvgIcon插件配置
 * @FilePath: \ux-admin-vue3\vite\plugins\svg-icon.ts
 */

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

export default function createSvgIcon(isBuild: boolean) {
    return createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
        symbolId: "icon-[dir]-[name]",
        svgoOptions: isBuild
    });
}
