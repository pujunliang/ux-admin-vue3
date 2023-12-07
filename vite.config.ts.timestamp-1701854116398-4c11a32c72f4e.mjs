// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/code/%E4%BB%A3%E7%A0%81/ux-admin/ux-admin-vue3/node_modules/.pnpm/vite@4.4.5_@types+node@20.6.0_sass@1.63.3/node_modules/vite/dist/node/index.js";
import { resolve } from "path";

// build/plugins/index.ts
import vue from "file:///D:/code/%E4%BB%A3%E7%A0%81/ux-admin/ux-admin-vue3/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.4.5_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/code/%E4%BB%A3%E7%A0%81/ux-admin/ux-admin-vue3/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.2_vite@4.4.5_vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";

// build/plugins/svg-icon.ts
import { createSvgIconsPlugin } from "file:///D:/code/%E4%BB%A3%E7%A0%81/ux-admin/ux-admin-vue3/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.4.5/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
}

// build/plugins/compression.ts
import compression from "file:///D:/code/%E4%BB%A3%E7%A0%81/ux-admin/ux-admin-vue3/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.4.5/node_modules/vite-plugin-compression/dist/index.mjs";
function createCompression(env) {
  const { VITE_BUILD_COMPRESS } = env;
  const plugin = [];
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(",");
    if (compressList.includes("gzip")) {
      plugin.push(
        compression({
          ext: ".gz",
          deleteOriginFile: false
        })
      );
    }
    if (compressList.includes("brotli")) {
      plugin.push(
        compression({
          ext: ".br",
          algorithm: "brotliCompress",
          deleteOriginFile: false
        })
      );
    }
  }
  return plugin;
}

// build/plugins/setup-extend.ts
import setupExtend from "file:///D:/code/%E4%BB%A3%E7%A0%81/ux-admin/ux-admin-vue3/node_modules/.pnpm/unplugin-vue-setup-extend-plus@1.0.0/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
function createSetupExtend() {
  return setupExtend({});
}

// build/plugins/otherPlugins.ts
import { createHtmlPlugin } from "file:///D:/code/%E4%BB%A3%E7%A0%81/ux-admin/ux-admin-vue3/node_modules/.pnpm/vite-plugin-html@3.2.0_vite@4.4.5/node_modules/vite-plugin-html/dist/index.mjs";
import { VitePWA } from "file:///D:/code/%E4%BB%A3%E7%A0%81/ux-admin/ux-admin-vue3/node_modules/.pnpm/vite-plugin-pwa@0.16.5_vite@4.4.5_workbox-build@7.0.0_workbox-window@7.0.0/node_modules/vite-plugin-pwa/dist/index.js";
import { visualizer } from "file:///D:/code/%E4%BB%A3%E7%A0%81/ux-admin/ux-admin-vue3/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2_rollup@2.79.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { viteMockServe } from "file:///D:/code/%E4%BB%A3%E7%A0%81/ux-admin/ux-admin-vue3/node_modules/.pnpm/vite-plugin-mock@2.9.6_mockjs@1.1.0_rollup@2.79.1_vite@4.4.5/node_modules/vite-plugin-mock/dist/index.js";
import { prismjsPlugin } from "file:///D:/code/%E4%BB%A3%E7%A0%81/ux-admin/ux-admin-vue3/node_modules/.pnpm/vite-plugin-prismjs@0.0.8_prismjs@1.29.0/node_modules/vite-plugin-prismjs/dist/index.js";
var htmlPlugin = (viteEnv) => {
  const { VITE_GLOB_APP_TITLE } = viteEnv;
  const htmlPluginOption = {
    inject: {
      data: { title: VITE_GLOB_APP_TITLE }
    }
  };
  return createHtmlPlugin(htmlPluginOption);
};
var visualizerPlugin = () => {
  const visualizerPluginOption = {
    filename: "stats.html",
    gzipSize: true,
    brotliSize: true
  };
  return visualizer(visualizerPluginOption);
};
var pwaPlugin = (viteEnv) => {
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
var mockPlugin = (isBuild) => {
  return viteMockServe({
    mockPath: "mock",
    localEnabled: true,
    prodEnabled: !isBuild ? false : true
    //生产环境下为false，这样就不会打包到生产包中
  });
};
var highlightPlugin = () => {
  return prismjsPlugin({
    languages: "all",
    // 语言
    plugins: ["line-numbers", "show-language", "copy-to-clipboard", "inline-color"],
    theme: "coy",
    // 主题
    css: true
  });
};

// build/plugins/index.ts
function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [];
  vitePlugins.push(vue());
  vitePlugins.push(vueJsx());
  vitePlugins.push(createSetupExtend());
  vitePlugins.push(createSvgIcon(isBuild));
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  vitePlugins.push(htmlPlugin(viteEnv));
  vitePlugins.push(visualizerPlugin());
  vitePlugins.push(pwaPlugin(viteEnv));
  vitePlugins.push(mockPlugin(isBuild));
  vitePlugins.push(highlightPlugin());
  return vitePlugins;
}

// build/getEnv.ts
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT")
      realName = Number(realName);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
      }
    }
    ret[envName] = realName;
  }
  return ret;
}

// build/proxy.ts
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path2) => path2.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// build/app-info.ts
import dayjs from "file:///D:/code/%E4%BB%A3%E7%A0%81/ux-admin/ux-admin-vue3/node_modules/.pnpm/dayjs@1.11.9/node_modules/dayjs/dayjs.min.js";
function getAppInfo(pkg) {
  return JSON.stringify({
    pkg,
    lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
  });
}

// package.json
var package_default = {
  name: "ux-admin-vue3",
  author: "pu jun liang",
  private: true,
  version: "1.0.0",
  type: "module",
  description: "ux-admin open source management system",
  scripts: {
    dev: "vite",
    serve: "vite",
    "build:dev": "vue-tsc && vite build --mode development",
    "build:test": "vue-tsc && vite build --mode test",
    "build:pro": "vue-tsc && vite build --mode production",
    "type:check": "vue-tsc --noEmit --skipLibCheck",
    preview: "npm run build:dev && vite preview",
    "lint:eslint": "eslint --fix --ext .js,.ts,.vue ./src",
    "lint:prettier": 'prettier --write "src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}"',
    commit: "git add -A && czg && git push"
  },
  dependencies: {
    "@element-plus/icons-vue": "^2.1.0",
    "@vueuse/core": "^10.4.1",
    apexcharts: "^3.44.0",
    axios: "^1.5.0",
    dayjs: "^1.11.9",
    "element-plus": "^2.3.12",
    "js-cookie": "^3.0.5",
    lodash: "^4.17.21",
    md5: "^2.3.0",
    mitt: "^3.0.1",
    nprogress: "^0.2.0",
    pinia: "^2.1.6",
    "pinia-plugin-persistedstate": "^3.2.0",
    prismjs: "^1.29.0",
    qs: "^6.11.2",
    remixicon: "^3.5.0",
    screenfull: "^6.0.2",
    sortablejs: "^1.15.0",
    vue: "^3.3.4",
    "vue-i18n": "^9.4.1",
    "vue-router": "^4.2.4",
    "vue3-apexcharts": "^1.4.4"
  },
  devDependencies: {
    "@types/md5": "^2.3.2",
    "@types/node": "^20.6.0",
    "@typescript-eslint/eslint-plugin": "^6.7.0",
    "@typescript-eslint/parser": "^6.7.0",
    "@vitejs/plugin-vue": "^4.2.3",
    "@vitejs/plugin-vue-jsx": "^3.0.2",
    consola: "^3.2.3",
    eslint: "^8.49.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "eslint-plugin-vue": "^9.17.0",
    mockjs: "^1.1.0",
    prettier: "^3.0.3",
    "rollup-plugin-visualizer": "^5.9.2",
    sass: "^1.63.3",
    typescript: "^5.0.2",
    "unplugin-vue-setup-extend-plus": "^1.0.0",
    vite: "^4.4.5",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-html": "^3.2.0",
    "vite-plugin-mock": "2.9.6",
    "vite-plugin-prismjs": "^0.0.8",
    "vite-plugin-pwa": "^0.16.5",
    "vite-plugin-svg-icons": "^2.0.1",
    "vue-tsc": "^1.8.5"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "D:\\code\\\u4EE3\u7801\\ux-admin\\ux-admin-vue3";
var __APP_INFO__ = getAppInfo(package_default);
var vite_config_default = defineConfig(({ mode, command }) => {
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
        "~": resolve(__vite_injected_original_dirname, "./"),
        // 配置路径
        "@": resolve(__vite_injected_original_dirname, "src")
        // 配置别名；将 @ 指向'src'目录
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
      chunkSizeWarningLimit: 2e3,
      assetsInlineLimit: 0,
      cssCodeSplit: true,
      // 将css文件输出到单独的文件中
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
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvcGx1Z2lucy9pbmRleC50cyIsICJidWlsZC9wbHVnaW5zL3N2Zy1pY29uLnRzIiwgImJ1aWxkL3BsdWdpbnMvY29tcHJlc3Npb24udHMiLCAiYnVpbGQvcGx1Z2lucy9zZXR1cC1leHRlbmQudHMiLCAiYnVpbGQvcGx1Z2lucy9vdGhlclBsdWdpbnMudHMiLCAiYnVpbGQvZ2V0RW52LnRzIiwgImJ1aWxkL3Byb3h5LnRzIiwgImJ1aWxkL2FwcC1pbmZvLnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcXHU0RUUzXHU3ODAxXFxcXHV4LWFkbWluXFxcXHV4LWFkbWluLXZ1ZTNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcXHU0RUUzXHU3ODAxXFxcXHV4LWFkbWluXFxcXHV4LWFkbWluLXZ1ZTNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGUvJUU0JUJCJUEzJUU3JUEwJTgxL3V4LWFkbWluL3V4LWFkbWluLXZ1ZTMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjcmVhdGVWaXRlUGx1Z2lucyB9IGZyb20gXCIuL2J1aWxkL3BsdWdpbnMvaW5kZXhcIjtcbmltcG9ydCB7IHdyYXBwZXJFbnYgfSBmcm9tIFwiLi9idWlsZC9nZXRFbnZcIjtcbmltcG9ydCB7IGNyZWF0ZVByb3h5IH0gZnJvbSBcIi4vYnVpbGQvcHJveHlcIjtcbmltcG9ydCBnZXRBcHBJbmZvIGZyb20gXCIuL2J1aWxkL2FwcC1pbmZvXCI7XG5pbXBvcnQgcGtnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiO1xuaW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnLCBDb25maWdFbnYgfSBmcm9tIFwidml0ZVwiO1xuXG5jb25zdCBfX0FQUF9JTkZPX18gPSBnZXRBcHBJbmZvKHBrZyk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlLCBjb21tYW5kIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xuICAgIGNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpO1xuICAgIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XG4gICAgY29uc3Qgdml0ZUVudiA9IHdyYXBwZXJFbnYoZW52KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGJhc2U6IHZpdGVFbnYuVklURV9QVUJMSUNfUEFUSCxcbiAgICAgICAgcm9vdCxcbiAgICAgICAgZGVmaW5lOiB7XG4gICAgICAgICAgICBfX0FQUF9JTkZPX19cbiAgICAgICAgfSxcbiAgICAgICAgLy8gXHU5MEU4XHU3RjcyXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU1NDhDXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU0RTBCXHU3Njg0VVJMXHUzMDAyXG4gICAgICAgIC8vIFx1OUVEOFx1OEJBNFx1NjBDNVx1NTFCNVx1NEUwQlx1RkYwQ3ZpdGUgXHU0RjFBXHU1MDQ3XHU4QkJFXHU0RjYwXHU3Njg0XHU1RTk0XHU3NTI4XHU2NjJGXHU4OEFCXHU5MEU4XHU3RjcyXHU1NzI4XHU0RTAwXHU0RTJBXHU1N0RGXHU1NDBEXHU3Njg0XHU2ODM5XHU4REVGXHU1Rjg0XHU0RTBBXG4gICAgICAgIC8vIFx1NEY4Qlx1NTk4MiBodHRwczovL3d3dy5iYWlkdS5jb20vXHUzMDAyXHU1OTgyXHU2NzlDXHU1RTk0XHU3NTI4XHU4OEFCXHU5MEU4XHU3RjcyXHU1NzI4XHU0RTAwXHU0RTJBXHU1QjUwXHU4REVGXHU1Rjg0XHU0RTBBXHVGRjBDXHU0RjYwXHU1QzMxXHU5NzAwXHU4OTgxXHU3NTI4XHU4RkQ5XHU0RTJBXHU5MDA5XHU5ODc5XHU2MzA3XHU1QjlBXHU4RkQ5XHU0RTJBXHU1QjUwXHU4REVGXHU1Rjg0XHUzMDAyXHU0RjhCXHU1OTgyXHVGRjBDXHU1OTgyXHU2NzlDXHU0RjYwXHU3Njg0XHU1RTk0XHU3NTI4XHU4OEFCXHU5MEU4XHU3RjcyXHU1NzI4IGh0dHBzOi8vd3d3LmJhaWR1LmNvbS9hZG1pbi9cdUZGMENcdTUyMTlcdThCQkVcdTdGNkUgYmFzZVVybCBcdTRFM0EgL2FkbWluL1x1MzAwMlxuICAgICAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucyh2aXRlRW52LCBjb21tYW5kID09PSBcImJ1aWxkXCIpLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgICAgIFwiflwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL1wiKSwgLy8gXHU5MTREXHU3RjZFXHU4REVGXHU1Rjg0XG4gICAgICAgICAgICAgICAgXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSAvLyBcdTkxNERcdTdGNkVcdTUyMkJcdTU0MERcdUZGMUJcdTVDMDYgQCBcdTYzMDdcdTU0MTEnc3JjJ1x1NzZFRVx1NUY1NVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IFtcIi5tanNcIiwgXCIuanNcIiwgXCIudHNcIiwgXCIuanN4XCIsIFwiLnRzeFwiLCBcIi5qc29uXCIsIFwiLnZ1ZVwiXVxuICAgICAgICB9LFxuICAgICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgICAgICAgICAgcG9ydDogdml0ZUVudi5WSVRFX1BPUlQsXG4gICAgICAgICAgICBvcGVuOiB2aXRlRW52LlZJVEVfT1BFTixcbiAgICAgICAgICAgIGNvcnM6IHRydWUsXG4gICAgICAgICAgICAvLyBMb2FkIHByb3h5IGNvbmZpZ3VyYXRpb24gZnJvbSAuZW52LmRldmVsb3BtZW50XG4gICAgICAgICAgICBwcm94eTogY3JlYXRlUHJveHkodml0ZUVudi5WSVRFX1BST1hZKVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vZml4OmVycm9yOnN0ZGluPjo3MzU2OjE6IHdhcm5pbmc6IFwiQGNoYXJzZXRcIiBtdXN0IGJlIHRoZSBmaXJzdCBydWxlIGluIHRoZSBmaWxlXG4gICAgICAgIGNzczoge1xuICAgICAgICAgICAgLy8gcG9zdGNzczoge1xuICAgICAgICAgICAgLy8gICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIC8vICAgICAgICAge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgcG9zdGNzc1BsdWdpbjogXCJpbnRlcm5hbDpjaGFyc2V0LXJlbW92YWxcIixcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIEF0UnVsZToge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNoYXJzZXQ6IGF0UnVsZSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmIChhdFJ1bGUubmFtZSA9PT0gXCJjaGFyc2V0XCIpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGF0UnVsZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgIF1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSxcblxuICAgICAgICBlc2J1aWxkOiB7XG4gICAgICAgICAgICBwdXJlOiB2aXRlRW52LlZJVEVfRFJPUF9DT05TT0xFID8gW1wiY29uc29sZS5sb2dcIiwgXCJkZWJ1Z2dlclwiXSA6IFtdXG4gICAgICAgIH0sXG5cbiAgICAgICAgYnVpbGQ6IHtcbiAgICAgICAgICAgIG91dERpcjogXCJkaXN0XCIsXG4gICAgICAgICAgICBtaW5pZnk6IFwiZXNidWlsZFwiLFxuICAgICAgICAgICAgLy8gZXNidWlsZCBcdTYyNTNcdTUzMDVcdTY2RjRcdTVGRUJcdUZGMENcdTRGNDZcdTY2MkZcdTRFMERcdTgwRkRcdTUzQkJcdTk2NjQgY29uc29sZS5sb2dcdUZGMEN0ZXJzZXJcdTYyNTNcdTUzMDVcdTYxNjJcdUZGMENcdTRGNDZcdTgwRkRcdTUzQkJcdTk2NjQgY29uc29sZS5sb2dcbiAgICAgICAgICAgIC8vIG1pbmlmeTogXCJ0ZXJzZXJcIixcbiAgICAgICAgICAgIC8vIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgICAgICAgIC8vICAgICBjb21wcmVzczoge1xuICAgICAgICAgICAgLy8gICAgICAgICBrZWVwX2luZmluaXR5OiB0cnVlLCAvLyBcdTk2MzJcdTZCNjIgSW5maW5pdHkgXHU4OEFCXHU1MzhCXHU3RjI5XHU2MjEwIDEvMFx1RkYwQ1x1OEZEOVx1NTNFRlx1ODBGRFx1NEYxQVx1NUJGQ1x1ODFGNCBDaHJvbWUgXHU0RTBBXHU3Njg0XHU2MDI3XHU4MEZEXHU5NUVFXHU5ODk4XG4gICAgICAgICAgICAvLyAgICAgICAgIGRyb3BfY29uc29sZTogdml0ZUVudi5WSVRFX0RST1BfQ09OU09MRSxcbiAgICAgICAgICAgIC8vICAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZVxuICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAvLyAgICAgZm9ybWF0OiB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNvbW1lbnRzOiBmYWxzZSAvLyBcdTUyMjBcdTk2NjRcdTZDRThcdTkxQ0FcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIFx1Nzk4MVx1NzUyOCBnemlwIFx1NTM4Qlx1N0YyOVx1NTkyN1x1NUMwRlx1NjJBNVx1NTQ0QVx1RkYwQ1x1NTNFRlx1NzU2NVx1NUZBRVx1NTFDRlx1NUMxMVx1NjI1M1x1NTMwNVx1NjVGNlx1OTVGNFxuICAgICAgICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLFxuICAgICAgICAgICAgLy8gXHU4OUM0XHU1QjlBXHU4OUU2XHU1M0QxXHU4QjY2XHU1NDRBXHU3Njg0IGNodW5rIFx1NTkyN1x1NUMwRlxuICAgICAgICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAyMDAwLFxuICAgICAgICAgICAgYXNzZXRzSW5saW5lTGltaXQ6IDAsXG4gICAgICAgICAgICBjc3NDb2RlU3BsaXQ6IHRydWUsIC8vIFx1NUMwNmNzc1x1NjU4N1x1NEVGNlx1OEY5M1x1NTFGQVx1NTIzMFx1NTM1NVx1NzJFQ1x1NzY4NFx1NjU4N1x1NEVGNlx1NEUyRFxuICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgICAgICAvLyBTdGF0aWMgcmVzb3VyY2UgY2xhc3NpZmljYXRpb24gYW5kIHBhY2thZ2luZ1xuICAgICAgICAgICAgICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxuICAgICAgICAgICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxuICAgICAgICAgICAgICAgICAgICBhc3NldEZpbGVOYW1lczogXCJhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXFx1NEVFM1x1NzgwMVxcXFx1eC1hZG1pblxcXFx1eC1hZG1pbi12dWUzXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcXHU0RUUzXHU3ODAxXFxcXHV4LWFkbWluXFxcXHV4LWFkbWluLXZ1ZTNcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZS8lRTQlQkIlQTMlRTclQTAlODEvdXgtYWRtaW4vdXgtYWRtaW4tdnVlMy9idWlsZC9wbHVnaW5zL2luZGV4LnRzXCI7aW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiO1xuaW1wb3J0IGNyZWF0ZVN2Z0ljb24gZnJvbSBcIi4vc3ZnLWljb25cIjtcbmltcG9ydCBjcmVhdGVDb21wcmVzc2lvbiBmcm9tIFwiLi9jb21wcmVzc2lvblwiO1xuaW1wb3J0IGNyZWF0ZVNldHVwRXh0ZW5kIGZyb20gXCIuL3NldHVwLWV4dGVuZFwiO1xuaW1wb3J0IHsgaHRtbFBsdWdpbiwgdmlzdWFsaXplclBsdWdpbiwgcHdhUGx1Z2luLCBtb2NrUGx1Z2luLCBoaWdobGlnaHRQbHVnaW4gfSBmcm9tIFwiLi9vdGhlclBsdWdpbnNcIjtcbi8qKlxuICogXHU1MjFCXHU1RUZBIHZpdGUgXHU2M0QyXHU0RUY2XG4gKiBAcGFyYW0gdml0ZUVudlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnModml0ZUVudjogVml0ZUVudiwgaXNCdWlsZDogYm9vbGVhbiA9IGZhbHNlKTogKFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdKVtdIHtcbiAgICAvLyBjb25zdCB7IFZJVEVfR0xPQl9BUFBfVElUTEUsIFZJVEVfUkVQT1JULCBWSVRFX1BXQSB9ID0gdml0ZUVudjtcblxuICAgIGNvbnN0IHZpdGVQbHVnaW5zOiBBcnJheTxQbHVnaW5PcHRpb24+ID0gW107XG4gICAgdml0ZVBsdWdpbnMucHVzaCh2dWUoKSk7XG4gICAgdml0ZVBsdWdpbnMucHVzaCh2dWVKc3goKSk7XG4gICAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVTZXR1cEV4dGVuZCgpKTtcbiAgICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZVN2Z0ljb24oaXNCdWlsZCkpO1xuICAgIGlzQnVpbGQgJiYgdml0ZVBsdWdpbnMucHVzaCguLi5jcmVhdGVDb21wcmVzc2lvbih2aXRlRW52KSk7XG5cbiAgICAvLyBodG1sXG4gICAgdml0ZVBsdWdpbnMucHVzaChodG1sUGx1Z2luKHZpdGVFbnYpKTtcbiAgICAvL3Zpc3VhbFxuICAgIHZpdGVQbHVnaW5zLnB1c2godmlzdWFsaXplclBsdWdpbigpKTtcbiAgICAvL3B3YVxuICAgIHZpdGVQbHVnaW5zLnB1c2gocHdhUGx1Z2luKHZpdGVFbnYpKTtcbiAgICAvL21vY2tcbiAgICB2aXRlUGx1Z2lucy5wdXNoKG1vY2tQbHVnaW4oaXNCdWlsZCkpO1xuICAgIC8vIGNvZGUgaGlnaGxpZ2h0XG4gICAgdml0ZVBsdWdpbnMucHVzaChoaWdobGlnaHRQbHVnaW4oKSk7XG4gICAgLy8gLy9zdHlsZUltcG9ydFxuICAgIC8vIC8vIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlU3R5bGVQbHVnaW4oKSk7XG4gICAgcmV0dXJuIHZpdGVQbHVnaW5zO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXFx1NEVFM1x1NzgwMVxcXFx1eC1hZG1pblxcXFx1eC1hZG1pbi12dWUzXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcXHU0RUUzXHU3ODAxXFxcXHV4LWFkbWluXFxcXHV4LWFkbWluLXZ1ZTNcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxzdmctaWNvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZS8lRTQlQkIlQTMlRTclQTAlODEvdXgtYWRtaW4vdXgtYWRtaW4tdnVlMy9idWlsZC9wbHVnaW5zL3N2Zy1pY29uLnRzXCI7LypcbiAqIEBBdXRob3I6IGp1bmxpYW5nLnB1XG4gKiBARGF0ZTogMjAyMy0wOS0xNCAwOTo1ODo1NFxuICogQExhc3RFZGl0b3JzOiBqdW5saWFuZy5wdVxuICogQExhc3RFZGl0VGltZTogMjAyMy0wOS0xNSAxNjo1MzoyNlxuICogQERlc2NyaXB0aW9uOiBTdmdJY29uXHU2M0QyXHU0RUY2XHU5MTREXHU3RjZFXG4gKiBARmlsZVBhdGg6IFxcdXgtYWRtaW4tdnVlM1xcdml0ZVxccGx1Z2luc1xcc3ZnLWljb24udHNcbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVN2Z0ljb24oaXNCdWlsZDogYm9vbGVhbikge1xuICAgIHJldHVybiBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwic3JjL2Fzc2V0cy9pY29ucy9zdmdcIildLFxuICAgICAgICBzeW1ib2xJZDogXCJpY29uLVtkaXJdLVtuYW1lXVwiLFxuICAgICAgICBzdmdvT3B0aW9uczogaXNCdWlsZFxuICAgIH0pO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXFx1NEVFM1x1NzgwMVxcXFx1eC1hZG1pblxcXFx1eC1hZG1pbi12dWUzXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcXHU0RUUzXHU3ODAxXFxcXHV4LWFkbWluXFxcXHV4LWFkbWluLXZ1ZTNcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxjb21wcmVzc2lvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZS8lRTQlQkIlQTMlRTclQTAlODEvdXgtYWRtaW4vdXgtYWRtaW4tdnVlMy9idWlsZC9wbHVnaW5zL2NvbXByZXNzaW9uLnRzXCI7LypcbiAqIEBBdXRob3I6IGp1bmxpYW5nLnB1XG4gKiBARGF0ZTogMjAyMy0wOS0xMyAxNjowNjoyOFxuICogQExhc3RFZGl0b3JzOiBqdW5saWFuZy5wdVxuICogQExhc3RFZGl0VGltZTogMjAyMy0wOS0xNSAxNjo1Mjo0MVxuICogQERlc2NyaXB0aW9uOiB2aXRlXHU1MzhCXHU3RjI5XHU2NUI5XHU2ODQ4XHU5MTREXHU3RjZFXG4gKiBARmlsZVBhdGg6IFxcdXgtYWRtaW4tdnVlM1xcdml0ZVxccGx1Z2luc1xcY29tcHJlc3Npb24udHNcbiAqL1xuaW1wb3J0IGNvbXByZXNzaW9uIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29tcHJlc3Npb24oZW52KSB7XG4gICAgY29uc3QgeyBWSVRFX0JVSUxEX0NPTVBSRVNTIH0gPSBlbnY7XG4gICAgY29uc3QgcGx1Z2luOiBBcnJheTxhbnk+ID0gW107XG4gICAgaWYgKFZJVEVfQlVJTERfQ09NUFJFU1MpIHtcbiAgICAgICAgY29uc3QgY29tcHJlc3NMaXN0ID0gVklURV9CVUlMRF9DT01QUkVTUy5zcGxpdChcIixcIik7XG4gICAgICAgIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoXCJnemlwXCIpKSB7XG4gICAgICAgICAgICBwbHVnaW4ucHVzaChcbiAgICAgICAgICAgICAgICBjb21wcmVzc2lvbih7XG4gICAgICAgICAgICAgICAgICAgIGV4dDogXCIuZ3pcIixcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlT3JpZ2luRmlsZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKFwiYnJvdGxpXCIpKSB7XG4gICAgICAgICAgICBwbHVnaW4ucHVzaChcbiAgICAgICAgICAgICAgICBjb21wcmVzc2lvbih7XG4gICAgICAgICAgICAgICAgICAgIGV4dDogXCIuYnJcIixcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtOiBcImJyb3RsaUNvbXByZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBsdWdpbjtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY29kZVxcXFxcdTRFRTNcdTc4MDFcXFxcdXgtYWRtaW5cXFxcdXgtYWRtaW4tdnVlM1xcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb2RlXFxcXFx1NEVFM1x1NzgwMVxcXFx1eC1hZG1pblxcXFx1eC1hZG1pbi12dWUzXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcc2V0dXAtZXh0ZW5kLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlLyVFNCVCQiVBMyVFNyVBMCU4MS91eC1hZG1pbi91eC1hZG1pbi12dWUzL2J1aWxkL3BsdWdpbnMvc2V0dXAtZXh0ZW5kLnRzXCI7aW1wb3J0IHNldHVwRXh0ZW5kIGZyb20gXCJ1bnBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kLXBsdXMvdml0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTZXR1cEV4dGVuZCgpIHtcbiAgICByZXR1cm4gc2V0dXBFeHRlbmQoe30pO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXFx1NEVFM1x1NzgwMVxcXFx1eC1hZG1pblxcXFx1eC1hZG1pbi12dWUzXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcXHU0RUUzXHU3ODAxXFxcXHV4LWFkbWluXFxcXHV4LWFkbWluLXZ1ZTNcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxvdGhlclBsdWdpbnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGUvJUU0JUJCJUEzJUU3JUEwJTgxL3V4LWFkbWluL3V4LWFkbWluLXZ1ZTMvYnVpbGQvcGx1Z2lucy9vdGhlclBsdWdpbnMudHNcIjtpbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLWh0bWxcIjtcclxuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcclxuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1tb2NrXCI7XHJcbmltcG9ydCB7IHByaXNtanNQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4tcHJpc21qc1wiO1xyXG5cclxuLyoqXHJcbiAqIFx1NkNFOFx1NTE2NVx1NTNEOFx1OTFDRlx1NTIzMCBodG1sIFx1NjU4N1x1NEVGNlxyXG4gKiBAcGFyYW0gYXBwVGl0bGVcclxuICogQHJldHVybnNcclxuICovXHJcbmV4cG9ydCBjb25zdCBodG1sUGx1Z2luID0gKHZpdGVFbnY6IFZpdGVFbnYpOiBQbHVnaW5PcHRpb24gPT4ge1xyXG4gICAgY29uc3QgeyBWSVRFX0dMT0JfQVBQX1RJVExFIH0gPSB2aXRlRW52O1xyXG4gICAgY29uc3QgaHRtbFBsdWdpbk9wdGlvbjogYW55ID0ge1xyXG4gICAgICAgIGluamVjdDoge1xyXG4gICAgICAgICAgICBkYXRhOiB7IHRpdGxlOiBWSVRFX0dMT0JfQVBQX1RJVExFIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGNyZWF0ZUh0bWxQbHVnaW4oaHRtbFBsdWdpbk9wdGlvbik7XHJcbn07XHJcblxyXG4vKipcclxuICogXHU4OUM2XHU1NkZFXHU1MjA2XHU2NzkwXHU2M0QyXHU0RUY2XHJcbiAqIEBwYXJhbSB2aXRlRW52XHJcbiAqIEByZXR1cm5zIHJvbGx1cFx1NjNEMlx1NEVGNlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHZpc3VhbGl6ZXJQbHVnaW4gPSAoKTogYW55ID0+IHtcclxuICAgIGNvbnN0IHZpc3VhbGl6ZXJQbHVnaW5PcHRpb24gPSB7XHJcbiAgICAgICAgZmlsZW5hbWU6IFwic3RhdHMuaHRtbFwiLFxyXG4gICAgICAgIGd6aXBTaXplOiB0cnVlLFxyXG4gICAgICAgIGJyb3RsaVNpemU6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHZpc3VhbGl6ZXIodmlzdWFsaXplclBsdWdpbk9wdGlvbik7XHJcbn07XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uIFZpdGVQd2FcclxuICogQHBhcmFtIHZpdGVFbnZcclxuICovXHJcbmV4cG9ydCBjb25zdCBwd2FQbHVnaW4gPSAodml0ZUVudjogVml0ZUVudik6IFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdID0+IHtcclxuICAgIGNvbnN0IHsgVklURV9HTE9CX0FQUF9USVRMRSB9ID0gdml0ZUVudjtcclxuICAgIHJldHVybiBWaXRlUFdBKHtcclxuICAgICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxyXG4gICAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFZJVEVfR0xPQl9BUFBfVElUTEUsXHJcbiAgICAgICAgICAgIHNob3J0X25hbWU6IFZJVEVfR0xPQl9BUFBfVElUTEUsXHJcbiAgICAgICAgICAgIHRoZW1lX2NvbG9yOiBcIiNmZmZmZmZcIixcclxuICAgICAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzcmM6IFwiL2xvZ28ucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBcIi9sb2dvLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogXCIvbG9nby5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBwdXJwb3NlOiBcImFueSBtYXNrYWJsZVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBcdTY1NzBcdTYzNkVcdTZBMjFcdTYyREZcdTYzRDJcdTRFRjZcclxuICogQHBhcmFtIGlzQnVpbGRcclxuICogQHJldHVybnNcclxuICovXHJcbmV4cG9ydCBjb25zdCBtb2NrUGx1Z2luID0gKGlzQnVpbGQ6IGJvb2xlYW4pOiBQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSA9PiB7XHJcbiAgICByZXR1cm4gdml0ZU1vY2tTZXJ2ZSh7XHJcbiAgICAgICAgbW9ja1BhdGg6IFwibW9ja1wiLFxyXG4gICAgICAgIGxvY2FsRW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBwcm9kRW5hYmxlZDogIWlzQnVpbGQgPyBmYWxzZSA6IHRydWUgLy9cdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTRFMEJcdTRFM0FmYWxzZVx1RkYwQ1x1OEZEOVx1NjgzN1x1NUMzMVx1NEUwRFx1NEYxQVx1NjI1M1x1NTMwNVx1NTIzMFx1NzUxRlx1NEVBN1x1NTMwNVx1NEUyRFxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogXHU0RUUzXHU3ODAxXHU5QUQ4XHU0RUFFXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaGlnaGxpZ2h0UGx1Z2luID0gKCk6IFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdID0+IHtcclxuICAgIC8vIDFcdTMwMDFsaW5lLW51bWJlcnNcdTY2M0VcdTc5M0FcdTg4NENcdTY1NzBcclxuICAgIC8vIDJcdTMwMDFzaG93LWxhbmd1YWdlXHU2NjNFXHU3OTNBXHU4QkVEXHU4QTAwXHJcbiAgICAvLyAzXHUzMDAxY29weS10by1jbGlwYm9hcmRcdTY2M0VcdTc5M0FcdThCRURcdThBMDBcclxuICAgIC8vIDRcdTMwMDEnaW5saW5lLWNvbG9yJ1x1NTcyOFx1NEVFM1x1NzgwMVx1NEUyRFx1NjYzRVx1NzkzQVx1OTg5Q1x1ODI3Mlx1NTc1N1xyXG4gICAgcmV0dXJuIHByaXNtanNQbHVnaW4oe1xyXG4gICAgICAgIGxhbmd1YWdlczogXCJhbGxcIiwgLy8gXHU4QkVEXHU4QTAwXHJcbiAgICAgICAgcGx1Z2luczogW1wibGluZS1udW1iZXJzXCIsIFwic2hvdy1sYW5ndWFnZVwiLCBcImNvcHktdG8tY2xpcGJvYXJkXCIsIFwiaW5saW5lLWNvbG9yXCJdLFxyXG4gICAgICAgIHRoZW1lOiBcImNveVwiLCAvLyBcdTRFM0JcdTk4OThcclxuICAgICAgICBjc3M6IHRydWVcclxuICAgIH0pO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcXHU0RUUzXHU3ODAxXFxcXHV4LWFkbWluXFxcXHV4LWFkbWluLXZ1ZTNcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcXHU0RUUzXHU3ODAxXFxcXHV4LWFkbWluXFxcXHV4LWFkbWluLXZ1ZTNcXFxcYnVpbGRcXFxcZ2V0RW52LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlLyVFNCVCQiVBMyVFNyVBMCU4MS91eC1hZG1pbi91eC1hZG1pbi12dWUzL2J1aWxkL2dldEVudi50c1wiO2ltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RldkZuKG1vZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtb2RlID09PSBcImRldmVsb3BtZW50XCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb2RGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Rlc3RGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbW9kZSA9PT0gXCJ0ZXN0XCI7XG59XG5cbi8qKlxuICogV2hldGhlciB0byBnZW5lcmF0ZSBwYWNrYWdlIHByZXZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUmVwb3J0TW9kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5lbnYuVklURV9SRVBPUlQgPT09IFwidHJ1ZVwiO1xufVxuXG4vLyBSZWFkIGFsbCBlbnZpcm9ubWVudCB2YXJpYWJsZSBjb25maWd1cmF0aW9uIGZpbGVzIHRvIHByb2Nlc3MuZW52XG5leHBvcnQgZnVuY3Rpb24gd3JhcHBlckVudihlbnZDb25mOiBSZWNvcmRhYmxlKTogVml0ZUVudiB7XG4gICAgY29uc3QgcmV0OiBhbnkgPSB7fTtcblxuICAgIGZvciAoY29uc3QgZW52TmFtZSBvZiBPYmplY3Qua2V5cyhlbnZDb25mKSkge1xuICAgICAgICBsZXQgcmVhbE5hbWUgPSBlbnZDb25mW2Vudk5hbWVdLnJlcGxhY2UoL1xcXFxuL2csIFwiXFxuXCIpO1xuICAgICAgICByZWFsTmFtZSA9IHJlYWxOYW1lID09PSBcInRydWVcIiA/IHRydWUgOiByZWFsTmFtZSA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOiByZWFsTmFtZTtcbiAgICAgICAgaWYgKGVudk5hbWUgPT09IFwiVklURV9QT1JUXCIpIHJlYWxOYW1lID0gTnVtYmVyKHJlYWxOYW1lKTtcbiAgICAgICAgaWYgKGVudk5hbWUgPT09IFwiVklURV9QUk9YWVwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlYWxOYW1lID0gSlNPTi5wYXJzZShyZWFsTmFtZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge31cbiAgICAgICAgfVxuICAgICAgICByZXRbZW52TmFtZV0gPSByZWFsTmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn1cblxuLyoqXG4gKiBHZXQgdXNlciByb290IGRpcmVjdG9yeVxuICogQHBhcmFtIGRpciBmaWxlIHBhdGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3RQYXRoKC4uLmRpcjogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIC4uLmRpcik7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcXHU0RUUzXHU3ODAxXFxcXHV4LWFkbWluXFxcXHV4LWFkbWluLXZ1ZTNcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcXHU0RUUzXHU3ODAxXFxcXHV4LWFkbWluXFxcXHV4LWFkbWluLXZ1ZTNcXFxcYnVpbGRcXFxccHJveHkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGUvJUU0JUJCJUEzJUU3JUEwJTgxL3V4LWFkbWluL3V4LWFkbWluLXZ1ZTMvYnVpbGQvcHJveHkudHNcIjtpbXBvcnQgdHlwZSB7IFByb3h5T3B0aW9ucyB9IGZyb20gXCJ2aXRlXCI7XG5cbnR5cGUgUHJveHlJdGVtID0gW3N0cmluZywgc3RyaW5nXTtcblxudHlwZSBQcm94eUxpc3QgPSBQcm94eUl0ZW1bXTtcblxudHlwZSBQcm94eVRhcmdldExpc3QgPSBSZWNvcmQ8c3RyaW5nLCBQcm94eU9wdGlvbnM+O1xuXG4vKipcbiAqIFx1NTIxQlx1NUVGQVx1NEVFM1x1NzQwNlx1RkYwQ1x1NzUyOFx1NEU4RVx1ODlFM1x1Njc5MCAuZW52LmRldmVsb3BtZW50IFx1NEVFM1x1NzQwNlx1OTE0RFx1N0Y2RVxuICogQHBhcmFtIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5KGxpc3Q6IFByb3h5TGlzdCA9IFtdKSB7XG4gICAgY29uc3QgcmV0OiBQcm94eVRhcmdldExpc3QgPSB7fTtcbiAgICBmb3IgKGNvbnN0IFtwcmVmaXgsIHRhcmdldF0gb2YgbGlzdCkge1xuICAgICAgICBjb25zdCBodHRwc1JFID0gL15odHRwczpcXC9cXC8vO1xuICAgICAgICBjb25zdCBpc0h0dHBzID0gaHR0cHNSRS50ZXN0KHRhcmdldCk7XG5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2h0dHAtcGFydHkvbm9kZS1odHRwLXByb3h5I29wdGlvbnNcbiAgICAgICAgcmV0W3ByZWZpeF0gPSB7XG4gICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICAgIHdzOiB0cnVlLFxuICAgICAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7cHJlZml4fWApLCBcIlwiKSxcbiAgICAgICAgICAgIC8vIGh0dHBzIGlzIHJlcXVpcmUgc2VjdXJlPWZhbHNlXG4gICAgICAgICAgICAuLi4oaXNIdHRwcyA/IHsgc2VjdXJlOiBmYWxzZSB9IDoge30pXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcXHU0RUUzXHU3ODAxXFxcXHV4LWFkbWluXFxcXHV4LWFkbWluLXZ1ZTNcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcXHU0RUUzXHU3ODAxXFxcXHV4LWFkbWluXFxcXHV4LWFkbWluLXZ1ZTNcXFxcYnVpbGRcXFxcYXBwLWluZm8udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGUvJUU0JUJCJUEzJUU3JUEwJTgxL3V4LWFkbWluL3V4LWFkbWluLXZ1ZTMvYnVpbGQvYXBwLWluZm8udHNcIjtpbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRBcHBJbmZvKHBrZzogYW55KSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcGtnLFxuICAgICAgICBsYXN0QnVpbGRUaW1lOiBkYXlqcygpLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3NcIilcbiAgICB9KTtcbn1cbiIsICJ7XG4gICAgXCJuYW1lXCI6IFwidXgtYWRtaW4tdnVlM1wiLFxuICAgIFwiYXV0aG9yXCI6IFwicHUganVuIGxpYW5nXCIsXG4gICAgXCJwcml2YXRlXCI6IHRydWUsXG4gICAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjBcIixcbiAgICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwidXgtYWRtaW4gb3BlbiBzb3VyY2UgbWFuYWdlbWVudCBzeXN0ZW1cIixcbiAgICBcInNjcmlwdHNcIjoge1xuICAgICAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICAgICAgXCJzZXJ2ZVwiOiBcInZpdGVcIixcbiAgICAgICAgXCJidWlsZDpkZXZcIjogXCJ2dWUtdHNjICYmIHZpdGUgYnVpbGQgLS1tb2RlIGRldmVsb3BtZW50XCIsXG4gICAgICAgIFwiYnVpbGQ6dGVzdFwiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgdGVzdFwiLFxuICAgICAgICBcImJ1aWxkOnByb1wiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgcHJvZHVjdGlvblwiLFxuICAgICAgICBcInR5cGU6Y2hlY2tcIjogXCJ2dWUtdHNjIC0tbm9FbWl0IC0tc2tpcExpYkNoZWNrXCIsXG4gICAgICAgIFwicHJldmlld1wiOiBcIm5wbSBydW4gYnVpbGQ6ZGV2ICYmIHZpdGUgcHJldmlld1wiLFxuICAgICAgICBcImxpbnQ6ZXNsaW50XCI6IFwiZXNsaW50IC0tZml4IC0tZXh0IC5qcywudHMsLnZ1ZSAuL3NyY1wiLFxuICAgICAgICBcImxpbnQ6cHJldHRpZXJcIjogXCJwcmV0dGllciAtLXdyaXRlIFxcXCJzcmMvKiovKi57anMsdHMsanNvbix0c3gsY3NzLGxlc3Msc2Nzcyx2dWUsaHRtbCxtZH1cXFwiXCIsXG4gICAgICAgIFwiY29tbWl0XCI6IFwiZ2l0IGFkZCAtQSAmJiBjemcgJiYgZ2l0IHB1c2hcIlxuICAgIH0sXG4gICAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgICAgICBcIkBlbGVtZW50LXBsdXMvaWNvbnMtdnVlXCI6IFwiXjIuMS4wXCIsXG4gICAgICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjEwLjQuMVwiLFxuICAgICAgICBcImFwZXhjaGFydHNcIjogXCJeMy40NC4wXCIsXG4gICAgICAgIFwiYXhpb3NcIjogXCJeMS41LjBcIixcbiAgICAgICAgXCJkYXlqc1wiOiBcIl4xLjExLjlcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXNcIjogXCJeMi4zLjEyXCIsXG4gICAgICAgIFwianMtY29va2llXCI6IFwiXjMuMC41XCIsXG4gICAgICAgIFwibG9kYXNoXCI6IFwiXjQuMTcuMjFcIixcbiAgICAgICAgXCJtZDVcIjogXCJeMi4zLjBcIixcbiAgICAgICAgXCJtaXR0XCI6IFwiXjMuMC4xXCIsXG4gICAgICAgIFwibnByb2dyZXNzXCI6IFwiXjAuMi4wXCIsXG4gICAgICAgIFwicGluaWFcIjogXCJeMi4xLjZcIixcbiAgICAgICAgXCJwaW5pYS1wbHVnaW4tcGVyc2lzdGVkc3RhdGVcIjogXCJeMy4yLjBcIixcbiAgICAgICAgXCJwcmlzbWpzXCI6IFwiXjEuMjkuMFwiLFxuICAgICAgICBcInFzXCI6IFwiXjYuMTEuMlwiLFxuICAgICAgICBcInJlbWl4aWNvblwiOiBcIl4zLjUuMFwiLFxuICAgICAgICBcInNjcmVlbmZ1bGxcIjogXCJeNi4wLjJcIixcbiAgICAgICAgXCJzb3J0YWJsZWpzXCI6IFwiXjEuMTUuMFwiLFxuICAgICAgICBcInZ1ZVwiOiBcIl4zLjMuNFwiLFxuICAgICAgICBcInZ1ZS1pMThuXCI6IFwiXjkuNC4xXCIsXG4gICAgICAgIFwidnVlLXJvdXRlclwiOiBcIl40LjIuNFwiLFxuICAgICAgICBcInZ1ZTMtYXBleGNoYXJ0c1wiOiBcIl4xLjQuNFwiXG4gICAgfSxcbiAgICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgICAgIFwiQHR5cGVzL21kNVwiOiBcIl4yLjMuMlwiLFxuICAgICAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIwLjYuMFwiLFxuICAgICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjYuNy4wXCIsXG4gICAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl42LjcuMFwiLFxuICAgICAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl40LjIuM1wiLFxuICAgICAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjogXCJeMy4wLjJcIixcbiAgICAgICAgXCJjb25zb2xhXCI6IFwiXjMuMi4zXCIsXG4gICAgICAgIFwiZXNsaW50XCI6IFwiXjguNDkuMFwiLFxuICAgICAgICBcImVzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeOS4wLjBcIixcbiAgICAgICAgXCJlc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI6IFwiXjUuMC4wXCIsXG4gICAgICAgIFwiZXNsaW50LXBsdWdpbi12dWVcIjogXCJeOS4xNy4wXCIsXG4gICAgICAgIFwibW9ja2pzXCI6IFwiXjEuMS4wXCIsXG4gICAgICAgIFwicHJldHRpZXJcIjogXCJeMy4wLjNcIixcbiAgICAgICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS45LjJcIixcbiAgICAgICAgXCJzYXNzXCI6IFwiXjEuNjMuM1wiLFxuICAgICAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4wLjJcIixcbiAgICAgICAgXCJ1bnBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kLXBsdXNcIjogXCJeMS4wLjBcIixcbiAgICAgICAgXCJ2aXRlXCI6IFwiXjQuNC41XCIsXG4gICAgICAgIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjogXCJeMC41LjFcIixcbiAgICAgICAgXCJ2aXRlLXBsdWdpbi1odG1sXCI6IFwiXjMuMi4wXCIsXG4gICAgICAgIFwidml0ZS1wbHVnaW4tbW9ja1wiOiBcIjIuOS42XCIsXG4gICAgICAgIFwidml0ZS1wbHVnaW4tcHJpc21qc1wiOiBcIl4wLjAuOFwiLFxuICAgICAgICBcInZpdGUtcGx1Z2luLXB3YVwiOiBcIl4wLjE2LjVcIixcbiAgICAgICAgXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjogXCJeMi4wLjFcIixcbiAgICAgICAgXCJ2dWUtdHNjXCI6IFwiXjEuOC41XCJcbiAgICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStTLFNBQVMsY0FBYyxlQUFlO0FBQ3JWLFNBQVMsZUFBZTs7O0FDRHlULE9BQU8sU0FBUztBQUVqVyxPQUFPLFlBQVk7OztBQ09uQixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFVBQVU7QUFFRixTQUFSLGNBQStCLFNBQWtCO0FBQ3BELFNBQU8scUJBQXFCO0FBQUEsSUFDeEIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxzQkFBc0IsQ0FBQztBQUFBLElBQzlELFVBQVU7QUFBQSxJQUNWLGFBQWE7QUFBQSxFQUNqQixDQUFDO0FBQ0w7OztBQ1ZBLE9BQU8saUJBQWlCO0FBQ1QsU0FBUixrQkFBbUMsS0FBSztBQUMzQyxRQUFNLEVBQUUsb0JBQW9CLElBQUk7QUFDaEMsUUFBTSxTQUFxQixDQUFDO0FBQzVCLE1BQUkscUJBQXFCO0FBQ3JCLFVBQU0sZUFBZSxvQkFBb0IsTUFBTSxHQUFHO0FBQ2xELFFBQUksYUFBYSxTQUFTLE1BQU0sR0FBRztBQUMvQixhQUFPO0FBQUEsUUFDSCxZQUFZO0FBQUEsVUFDUixLQUFLO0FBQUEsVUFDTCxrQkFBa0I7QUFBQSxRQUN0QixDQUFDO0FBQUEsTUFDTDtBQUFBLElBQ0o7QUFDQSxRQUFJLGFBQWEsU0FBUyxRQUFRLEdBQUc7QUFDakMsYUFBTztBQUFBLFFBQ0gsWUFBWTtBQUFBLFVBQ1IsS0FBSztBQUFBLFVBQ0wsV0FBVztBQUFBLFVBQ1gsa0JBQWtCO0FBQUEsUUFDdEIsQ0FBQztBQUFBLE1BQ0w7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNBLFNBQU87QUFDWDs7O0FDakMrVixPQUFPLGlCQUFpQjtBQUV4VyxTQUFSLG9CQUFxQztBQUN4QyxTQUFPLFlB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
