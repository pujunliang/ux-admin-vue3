export const columnCodeTsx = `
const columns = reactive<ColumnProps<User.ResUserList>[]>([
 {
    prop: "username",
    label: "用户姓名",
    // 使用 headerRender 自定义表头
    headerRender: scope => {
      return (
        <el-button
          type="primary"
          onClick={() => {
            ElMessage.success("我是通过 tsx 语法渲染的表头");
          }}
        >
          {scope.column.label}
        </el-button>
      );
    }
  },
  {
    prop: "status",
    label: "用户状态",
    // 使用 render 自定义表格内容
    render: scope => {
      return (
          <el-switch
            model-value={scope.row.status}
            active-text={scope.row.status ? "启用" : "禁用"}
            active-value={1}
            inactive-value={0}
            onClick={() => changeStatus(scope.row)}
          />
        )
      );
    }
  },
];`;
