export const proTablePropsData = [
    {
        propsName: "columns",
        type: "ColumnProps",
        required: "✅",
        default: "[]",
        description: "ProTable 组件会根据此字段渲染搜索表单与表格列（支持动态更新），详情见 ColumnProps"
    },
    {
        propsName: "data",
        type: "Array",
        required: "❌",
        default: "—",
        description: "静态 tableData 数据（支持分页），若存在则不会使用 requestApi 返回的 data"
    },
    {
        propsName: "requestApi",
        type: "Function",
        required: "❌",
        default: "—",
        description: "获取表格数据的请求 API"
    },
    {
        propsName: "requestAuto",
        type: "Boolean",
        required: "❌",
        default: "true",
        description: "表格初始化时是否自动执行请求 API"
    },
    {
        propsName: "requestError",
        type: "Function",
        required: "❌",
        default: "—",
        description: "表格 API 请求错误监听"
    },
    {
        propsName: "dataCallback",
        type: "Array",
        required: "❌",
        default: "—",
        description: "后台返回数据的回调函数，可对后台返回数据进行处理"
    },
    {
        propsName: "title",
        type: "String",
        required: "❌",
        default: "—",
        description: "表格标题，目前没有用到"
    },
    {
        propsName: "pagination",
        type: "Boolean",
        required: "❌",
        default: "true",
        description: "是否显示分页组件：pagination 为 false 后台返回数据应该没有分页信息 和 list 字段，data 就是 list 数据"
    },
    {
        propsName: "initParam",
        type: "Object",
        required: "❌",
        default: "{}",
        description: "表格请求的初始化参数，该值变化会重新请求表格数据"
    },
    {
        propsName: "toolButton",
        type: "Boolean | Array",
        required: "❌",
        default: "true",
        description: '是否显示表格功能按钮，支持（["refresh" | "setting" | "search"]）'
    },
    {
        propsName: "rowKey",
        type: "String",
        required: "❌",
        default: "'id'",
        description: "当表格数据多选时，所指定的 id"
    },
    {
        propsName: "searchCol",
        type: "Number | Object",
        required: "❌",
        default: "{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }",
        description: "表格搜索项每列占比配置"
    },
    {
        propsName: "searchLabelWidth",
        type: "Number",
        required: "❌",
        default: "—",
        description: "查询条文本宽度"
    },
    {
        propsName: "searchLabelPosition",
        type: "Number",
        required: "❌",
        default: "'right'",
        description: '查询文本位置 ，支持（["right" | "top" | "left"]）'
    }
];
