export const columnPropsData = [
    {
        propsName: "type",
        type: "String",
        required: "❌",
        default: "—",
        description: '对应列的类型（"index" | "selection" | "radio" | "expand" | "sort"）'
    },
    {
        propsName: "tag",
        type: "Boolean",
        required: "❌",
        default: "false",
        description: "当前单元格值是否为标签展示，可通过 enum 数据中 tagType 字段指定 tag 类型"
    },
    {
        propsName: "isShow",
        type: "Boolean",
        required: "❌",
        default: "true",
        description: "当前列是否显示在表格内（只对 prop 列生效）"
    },
    {
        propsName: "search",
        type: "SearchProps",
        required: "❌",
        default: "—",
        description: "搜索项配置，详情见 SearchProps"
    },
    {
        propsName: "enum",
        type: "Array | Function",
        required: "❌",
        default: "—",
        description: "字典，可格式化单元格内容，还可以作为搜索框的下拉选项（字典可以为 API 请求函数，内部会自动执行）"
    },
    {
        propsName: "isFilterEnum",
        type: "Boolean",
        required: "❌",
        default: "true",
        description: "当前单元格值是否根据 enum 格式化（例如 enum 只作为搜索项数据，不参与内容格式化）"
    },
    {
        propsName: "fieldNames",
        type: "Object",
        required: "❌",
        default: "—",
        description: "指定 label && value && children 的 key 值"
    },
    {
        propsName: "headerRender",
        type: "Function",
        required: "❌",
        default: "—",
        description: "自定义表头内容渲染（tsx 语法、h 语法）"
    },
    {
        propsName: "render",
        type: "Function",
        required: "❌",
        default: "—",
        description: "自定义单元格内容渲染（tsx 语法、h 语法）"
    },
    {
        propsName: "_children",
        type: "ColumnProps",
        required: "❌",
        default: "—",
        description: "多级表头"
    }
];
