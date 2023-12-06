export const searchPropsData = [
    {
        propsName: "el",
        type: "String",
        required: "❌",
        default: "—",
        description:
            "当前项搜索框的类型，支持：input、input-number、select、select-v2、tree-select、cascader、date-picker、time-picker、time-select、switch、slider"
    },
    {
        propsName: "label",
        type: "String",
        required: "❌",
        default: "—",
        description: "当搜索项 label，如果不指定默认取 column 的 label"
    },
    {
        propsName: "props",
        type: "Object",
        required: "❌",
        default: "—",
        description: "根据 element plus 官方文档来传递，该属性所有值会透传到组件"
    },
    {
        propsName: "key",
        type: "String",
        required: "❌",
        default: "—",
        description: "当搜索项 key 不为 prop 属性时，可通过 key 指定"
    },
    {
        propsName: "tooltip",
        type: "String",
        required: "❌",
        default: "—",
        description: "搜索提示"
    },
    {
        propsName: "order",
        type: "Number",
        required: "❌",
        default: "—",
        description: "搜索项排序（从小到大）"
    },
    {
        propsName: "span",
        type: "Number",
        required: "❌",
        default: "1",
        description: "搜索项所占用的列数，默认为 1 列"
    },
    {
        propsName: "offset",
        type: "Number",
        required: "❌",
        default: "1",
        description: "搜索字段左侧偏移列数"
    },
    {
        propsName: "defaultValue",
        type: "Any",
        required: "❌",
        default: "1",
        description: "搜索项默认值（该值重置时会重置回初始值）"
    },
    {
        propsName: "render",
        type: "Function",
        required: "❌",
        default: "",
        description: "自定义搜索内容渲染（tsx 语法、h 语法）"
    }
];
