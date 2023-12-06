export const slotData = [
    {
        slotName: "—",
        description: "默认插槽，支持直接在 ProTable 中写 el-table-column 标签"
    },
    {
        slotName: "tableHeader",
        description: "自定义表格头部左侧区域的插槽，一般情况该区域放操作按钮"
    },
    {
        slotName: "toolButton",
        description: "自定义表格头部左右侧侧功能区域的插槽"
    },
    {
        slotName: "append",
        description:
            "插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。"
    },
    {
        slotName: "empty",
        description: "当表格数据为空时自定义的内容。"
    },
    {
        slotName: "pagination",
        description: "分页组件插槽。"
    },
    {
        slotName: "column.prop",
        description: "单元格的作用域插槽。"
    },
    {
        slotName: 'column.prop + "Header"',
        description: "表头的作用域插槽。"
    }
];
