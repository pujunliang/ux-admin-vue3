import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import { createVitePlugins } from "./build/plugins/index";
import { wrapperEnv } from "./build/getEnv";
import { createProxy } from "./build/proxy";
import getAppInfo from "./build/app-info";
import pkg from "./package.json";
import type { UserConfig, ConfigEnv } from "vite";

const __APP_INFO__ = getAppInfo(pkg);

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, process.cwd());
    const viteEnv = wrapperEnv(env);

    return {
        base: viteEnv.VITE_PUBLIC_PATH,
        root,
        define: {
            __APP_INFO__
        },
        // 部署生产环境和开发环境下的URL。
        // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
        // 例如 https://www.baidu.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.baidu.com/admin/，则设置 baseUrl 为 /admin/。
        plugins: createVitePlugins(viteEnv, command === "build"),
        resolve: {
            alias: {
                "~": resolve(__dirname, "./"), // 配置路径
                "@": resolve(__dirname, "src") // 配置别名；将 @ 指向'src'目录
            },
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
        },
        server: {
            host: "0.0.0.0",
            port: viteEnv.VITE_PORT,
            open: viteEnv.VITE_OPEN,
            cors: true,
            // Load proxy configuration from .env.development
            proxy: createProxy(viteEnv.VITE_PROXY)
        },

        //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
        css: {
            // postcss: {
            //     plugins: [
            //         {
            //             postcssPlugin: "internal:charset-removal",
            //             AtRule: {
            //                 charset: atRule => {
            //                     if (atRule.name === "charset") {
            //                         atRule.remove();
            //                     }
            //                 }
            //             }
            //         }
            //     ]
            // }
        },

        esbuild: {
            pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
        },

        build: {
            outDir: "dist",
            minify: "esbuild",
            // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
            // minify: "terser",
            // terserOptions: {
            //     compress: {
            //         keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
            //         drop_console: viteEnv.VITE_DROP_CONSOLE,
            //         drop_debugger: true
            //     },
            //     format: {
            //         comments: false // 删除注释
            //     }
            // },
            sourcemap: false,
            // 禁用 gzip 压缩大小报告，可略微减少打包时间
            reportCompressedSize: false,
            // 规定触发警告的 chunk 大小
            chunkSizeWarningLimit: 2000,
            assetsInlineLimit: 0,
            cssCodeSplit: true, // 将css文件输出到单独的文件中
            rollupOptions: {
                output: {
                    // Static resource classification and packaging
                    chunkFileNames: "assets/js/[name]-[hash].js",
                    entryFileNames: "assets/js/[name]-[hash].js",
                    assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
                }
            }
        }
    };
});
