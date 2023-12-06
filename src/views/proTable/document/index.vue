<template>
    <div class="detail-container">
        <span class="title">ProTable API</span>
        <span class="description">
            ProTable 组件目前使用属性透传进行重构，支持 el-table && el-table-column
            所有属性、事件、方法的调用，不会有任何心智负担。
        </span>
        <ul>
            <li>
                表格内容自适应屏幕宽高，溢出内容表格内部滚动（flex 布局） 表格搜索、重置、分页查询 Hooks 封装
                （页面使用不会存在任何搜索、重置、分页查询逻辑）
            </li>
            <li>
                表格数据操作 Hooks 封装（单条数据删除、批量删除、重置密码、状态切换等操作） 表格数据多选 Hooks 封装
                （支持现跨页勾选数据）
            </li>
            <li>表格数据导入组件、导出 Hooks 封装 表格搜索区域使用 Grid 布局重构，支持自定义响应式配置</li>
            <li>
                表格分页组件封装（Pagination）支持静态数据分页 表格数据刷新、列显隐、搜索区域显隐设置 表格配置 columns
                支持动态更新
            </li>
            <li>表格支持行拖拽排序、单选框设置</li>
            <li>表格配置支持多级 prop（示例 ==> prop: user.detail.name）</li>
            <li>单元格内容格式化、tag 标签显示（有字典 enum 会根据字典 enum 自动格式化）</li>
            <li>支持多级表头、表头内容自定义渲染（支持作用域插槽、tsx 语法、h 函数）</li>
            <li>支持单元格内容自定义渲染（支持作用域插槽、tsx 语法、h 函数）</li>
            <li>配合 TreeFilter、SelectFilter 组件使用更佳（项目中有使用示例）</li>
        </ul>
        <span class="title">模块划分</span>
        <span class="description">ProTable 组件共划分为：5大模块组成。</span>
        <ul>
            <li>1、表格搜索区域</li>
            <li>2、表格数据操作按钮区域</li>
            <li>3、表格功能按钮区域</li>
            <li>4、表格主体内容展示区域</li>
            <li>5、表格分页区域</li>
        </ul>

        <span class="title">表格搜索区域</span>
        <span class="description">
            搜索区域的字段都是存在于表格当中的，并且每个页面的搜索、重置方法都是一样的逻辑，只是不同的查询参数而已。我们通过在传表格配置项
            columns 时，直接指定某个 column 的 search 配置，就能把该项变为搜索项，然后使用 el
            字段可以指定搜索框的类型，最后把表格的搜索方法都封装成 Hooks 钩子函数。页面上完全就不会存在任何搜索、重置逻辑了。
        </span>

        <span class="description">
            搜索组件通过 component :is 动态组件 && v-bind 属性透传实现，将用户传递的参数全部透传到组件上，所以大家可以直接根据
            element 官方文档在 props 中传递参数了。具体逻辑处理请查看组件内代码和注释。
        </span>
        <ul>
            <li>1、表格搜索项可使用 tsx 组件自定义渲染。</li>
            <li>2、表格搜索组件支持了Grid响应式配置。</li>
        </ul>

        <span class="title">表格数据操作按钮区域</span>
        <span class="description">
            表格数据操作按钮基本上每个页面都会不一样，所以我们直接使用"作用域插槽"来完成每个页面的数据操作按钮区域，作用域插槽
            可以将表格多选数据信息从 ProTable 的 Hooks 多选钩子函数中传到页面上使用。
        </span>
        <span class="description">
            scope
            数据中包含：selectedList（当前选择的数据）、selectedListIds（当前选择的数据id）、isSelected（当前是否选中的数据）。
        </span>
        <pre>
            <code class="language-js line-numbers">{{headerCode}}</code>
        </pre>
        <span class="title">表格功能按钮区域</span>
        <span class="description">
            这块区域没什么特殊功能，只有四个按钮，其功能分别为：表格数据刷新（一直会携带当前查询和分页条件）、表格列设置（列显隐、列排序）、表格搜索区域显隐（方便展示更多的数据信息）。
            可通过 toolButton 属性控制这块区域的显隐。
        </span>

        <span class="title">表格主体内容展示区域</span>
        <span class="description">
            该区域是最重要的数据展示区域，对于使用最多的功能就是表头和单元格内容可以自定义渲染,表头支持headerRender方法（避免与
            el-table-column 上的属性重名导致报错）、作用域插槽（column.prop +
            'Header'）两种方式自定义，单元格内容支持render方法和作用域插槽（column 上的 prop 属性）两种方式自定义。
        </span>
        <span class="description">使用作用域插槽：</span>
        <pre>
            <code class="language-js line-numbers">{{columnScopeSlotCode}}</code>
        </pre>
        <span class="description">使用 tsx 语法：</span>
        <pre>
            <code class="language-js line-numbers">{{columnCodeTsx}}</code>
        </pre>
        <span class="description">
            💢💢💢 最强大的功能：如果你想使用 el-table 的任何属性、事件，目前通过属性透传都能支持。 如果你还不了解属性透传，请阅读
            vue 官方文档：cn.vuejs.org/guide/compo…
        </span>
        <ul>
            <li>ProTable 组件上的绑定的所有属性和事件都会通过 v-bind="$attrs" 透传到 el-table 上。</li>
            <li>ProTable 组件内部暴露了 el-table DOM，可通过 proTable.value.element.方法名 调用其方法。</li>
        </ul>

        <pre>
            <code class="language-js line-numbers">{{proTableCode}}</code>
        </pre>

        <span class="title">表格分页区域</span>
        <span class="description">
            分页区域也没有什么特殊的功能，该支持的都支持了🤣（页面上使用 ProTable 组件完全不存在分页逻辑）
        </span>
        <pre>
            <code class="language-js line-numbers">{{paginationCode}}</code>
        </pre>
        <span class="title">ProTable 文档 📚</span>
        <span class="title">1、ProTable 属性（ProTableProps）：</span>
        <span class="description">
            使用 v-bind="$attrs" 通过属性透传将 ProTable 组件属性全部透传到 el-table 上，所以我们支持 el-table 的所有 Props 属性。
        </span>
        <el-table
            :data="proTablePropsData"
            border
            style="width: 100%">
            <el-table-column
                prop="propsName"
                label="属性名"
                width="180"></el-table-column>
            <el-table-column
                prop="type"
                label="类型"
                width="180"></el-table-column>
            <el-table-column
                prop="required"
                label="是否必传"
                width="80"></el-table-column>
            <el-table-column
                prop="default"
                label="默认值"
                width="180"></el-table-column>
            <el-table-column
                prop="description"
                label="属性描述"></el-table-column>
        </el-table>
        <span class="description"></span>
        <span class="title">2、Column 配置（ColumnProps）：</span>
        <span class="description">
            使用 v-bind="column" 通过属性透传将每一项 column 属性全部透传到 el-table-column 上，所以我们支持 el-table-column
            的所有 Props 属性。
        </span>
        <el-table
            :data="columnPropsData"
            border
            style="width: 100%">
            <el-table-column
                prop="propsName"
                label="属性名"
                width="180"></el-table-column>
            <el-table-column
                prop="type"
                label="类型"
                width="180"></el-table-column>
            <el-table-column
                prop="required"
                label="是否必传"
                width="80"></el-table-column>
            <el-table-column
                prop="default"
                label="默认值"
                width="180"></el-table-column>
            <el-table-column
                prop="description"
                label="属性描述"></el-table-column>
        </el-table>
        <span class="description"></span>
        <span class="title">3、搜索项 配置（SearchProps）：</span>
        <span class="description">
            使用 v-bind="column.search.props“ 通过属性透传将 search.props 属性全部透传到每一项搜索组件上，所以我们支持
            input、select、tree-select、date-packer、time-picker、time-select、switch 大部分属性，并在其基础上还扩展了以下 Props：
        </span>
        <el-table
            :data="searchPropsData"
            border
            style="width: 100%">
            <el-table-column
                prop="propsName"
                label="属性名"
                width="180"></el-table-column>
            <el-table-column
                prop="type"
                label="类型"
                width="180"></el-table-column>
            <el-table-column
                prop="required"
                label="是否必传"
                width="80"></el-table-column>
            <el-table-column
                prop="default"
                label="默认值"
                width="180"></el-table-column>
            <el-table-column
                prop="description"
                label="属性描述"></el-table-column>
        </el-table>
        <span class="description"></span>
        <span class="title">4、ProTable 事件：</span>
        <span class="description">
            根据 ElementPlus Table 文档在 ProTable 组件上绑定事件即可，组件会通过 $attrs 透传给 el-table。
        </span>
        <el-table
            :data="eventsData"
            border
            style="width: 100%">
            <el-table-column
                prop="eventName"
                label="事件名"
                width="180"></el-table-column>
            <el-table-column
                prop="description"
                label="描述"></el-table-column>
            <el-table-column
                prop="callbackParams"
                label="回调参数"></el-table-column>
        </el-table>
        <span class="description"></span>
        <span class="title">5、ProTable 方法：</span>
        <span class="description">ProTable 组件暴露了 el-table 实例和一些组件内部的参数和方法：</span>
        <el-table
            :data="functionData"
            border
            style="width: 100%">
            <el-table-column
                prop="functionName"
                label="事件名"></el-table-column>
            <el-table-column
                prop="description"
                label="描述"></el-table-column>
        </el-table>
        <span class="description"></span>
        <span class="title">6、ProTable 插槽：</span>
        <el-table
            :data="slotData"
            border
            style="width: 100%">
            <el-table-column
                prop="slotName"
                label="插槽名"></el-table-column>
            <el-table-column
                prop="description"
                label="描述"></el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts" name="proTableDocument">
import { onMounted, onUpdated } from "vue";
import Prism from "prismjs";
import { proTablePropsData, columnPropsData, searchPropsData, eventsData, functionData, slotData } from "./data";
import { headerCode, columnScopeSlotCode, columnCodeTsx, proTableCode, paginationCode } from "./temp";
onUpdated(() => {
    Prism.highlightAll(); //修改内容后重新渲染
});
onMounted(() => {
    Prism.highlightAll(); //切换菜单重新渲染
});
</script>

<style lang="scss" scoped>
.title {
    display: block;
    color: var(--el-text-color-primary);
    font-weight: bold;
    padding-bottom: 24px;
    font-size: 17px !important;
    font-family: "SF Pro SC", "SF Pro Display";
}
.description {
    margin-bottom: 16px;
    display: block;
    font-family: "SF Pro SC", "SF Pro Display";
}

ul {
    line-height: 1.7;
    font-family: "SF Pro SC", "SF Pro Display";
    li {
        list-style: circle;
    }
}

.el-table {
    font-family: "SF Pro SC", "SF Pro Display";
}

.detail-container {
    background-color: rgb(255, 255, 255);
    padding: 16px;
}

pre[class*="language-"]:before,
pre[class*="language-"]:after {
    display: none;
}

pre[class*="language-"] > code {
    position: relative;
    z-index: 1;
    border-left: 5px solid #1a73e8;
    box-shadow:
        -1px 0px 0px 0px #1a73e8,
        0px 0px 0px 1px #dfdfdf;
    background-color: #fdfdfd;
    background-image: linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%);
    background-size: 3em 3em;
    background-origin: content-box;
    background-attachment: local;
    font-family: Consolas;
}
</style>
