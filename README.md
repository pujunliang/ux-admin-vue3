<h1 align="center">Welcome to ux-admin-vue3 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D%2016.0.0-blue.svg" />
  <img src="https://img.shields.io/badge/npm-%3E%3D%208.0.0-blue.svg" />
  <a href="https://github.com/pujunliang/ux-admin-vue3/master/README.md">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/pujunliang/ux-admin-vue3/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> vite4 + vue3.2 + Pinia + typescript + mockjs + apexcharts + remixicon 无限级菜单 权限管理 后台模板

## Author

👤 **pujunliang**

-   Github: [@pujunliang](https://github.com/pujunliang)
-   QQ: 1015867125
-   email: 1015867125@qq.com

## Prerequisites

-   node >= 16.0.0
-   npm >= 8.0.0

## Tips

### 当前框架技术栈: vite4 + vue3.2 + Pinia + typescript + mockjs + apexcharts + remixicon

## 1. ux-admin-vue3 快速开发平台简介

> 一款基于 Vue3.3、TypeScript、Vite4、Pinia、remixIcon、Element-Plus开源的后台管理框架，使用目前最新技术栈开发。项目提供了表格、图表、主题配置等诸多强大功能，可在一定程度上提高您的开发效率。同时采用了极简、快速开发的思路进行搭建，满足不同项目快速开发需求。另外本项目还封装了一些常用组件、Hooks、指令、动态路由、按钮级别权限控制等功能。

项目截图：

![enter description here](https://github.com/pujunliang/ux-admin-vue3/blob/master/img_readme/首页-UxAdmin.png)
![enter description here](https://github.com/pujunliang/ux-admin-vue3/blob/master/img_readme/数据大屏-UxAdmin.png)
![enter description here](https://github.com/pujunliang/ux-admin-vue3/blob/master/img_readme/使用ProTable-UxAdmin.png)
![enter description here](https://github.com/pujunliang/ux-admin-vue3/blob/master/img_readme/SelectFilter-UxAdmin.png)
![enter description here](https://github.com/pujunliang/ux-admin-vue3/blob/master/img_readme/关于项目-UxAdmin.png)

## 2. 准备工作

-开发环境

-   node.js v16.0+
-   vite v4
-   git

-技术栈

-   ES6+
-   vue v3.2+
-   vue-router
-   Pinia
-   axios
-   scss
-   element-ui plus
_   mockjs
_   apexcharts
_   typescript
-   tsx
-   remixicon

## 3. 实现功能

-   登录、退出

*   基于token

    -   状态拦截、404页面、403页面、500页面
    -   动态加载路由
    -   页面、按钮指令权限管理
    -   无限级菜单

-   封装vue-i18n@8.x国际化组件

*   全局功能

    -   系统全屏化
    -   多语言切换（中、英）
    -   全局菜单路径搜索
    -   导航面包屑
    -   标签页
    -   菜单折叠
    -   菜单手风琴

*   主题定制

    -   四种布局样式设置
    -   全局主题设置
    -   界面设置
    -   菜单收缩
    -   remixIcon 图标

*   tab标签导航

    -   右击快捷功能

*   高级表格
    -   内置联动 searchBar 查询条
    -   内置表格工具条
    -   支持多种自定义渲染（表头、单元格）
    -   支持树形、展开、单选、过滤、跨行、跨列等复杂操作
    -   内置有完善的 API 文档

-   数据大屏

-   封装了 api 模块
-   封装了 utils 工具模块
-   封装了 Directives 模块
-   封装了 Config 模块

*   组件封装
    -   ErrorMessage
    -   Grid
    -   ImportExcel
    -   Loading
    -   ProTable
    -   SearchForm
    -   SelectFilter
    -   SelectIcon
    -   SvgIcon
    -   SwitchDark
    -   TreeFilter
    -   Upload

# 设置淘宝镜像

pnpm config set registry https://registry.npm.taobao.org/
or
pnpm config set registry https://registry.npm.taobao.org

# 安装依赖

pnpm install

# 开发模式

pnpm dev
or
pnpm run dev

# 启动编译打包 生产环境

pnpm build:pro
or
pnpm run build:pro

## 结语

如果这个框架对您有帮助的话，麻烦请给个星点个star

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/pujunliang/ux-admin-vue3/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [pujunliang](https://github.com/pujunliang) <br/>
This project is [MIT](https://github.com/pujunliang/ux-admin-vue3/master/LICENSE) licensed.
