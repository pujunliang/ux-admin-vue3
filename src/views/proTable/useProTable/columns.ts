import { reactive, Ref } from "vue";
import { ColumnProps, ProTableInstance } from "@/components/ProTable/interface";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import { useHandleData } from "@/hooks/useHandleData";
import { getGenderStatus, getUserStatus } from "../utils";
import { headerRender, userNameRender, genderRender, ageSearchItemRender, statusRender } from "../render";
import { User } from "@/api/interface";
import { changeUserStatus } from "@/api/modules/user";

/**
 * 获取列配置
 * @param proTable
 * @returns
 */
export const useColumns = (proTable: Ref<ProTableInstance>) => {
    // 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
    const { BUTTONS } = useAuthButtons();

    // 切换用户状态
    const changeStatus = async (row: User.ResUserList) => {
        let messageContent: string = `切换【${row.username}】用户状态`;
        await useHandleData(
            changeUserStatus,
            {
                id: row.id,
                status: row.status == 1 ? 0 : 1
            },
            messageContent
        );
        proTable.value?.getTableList();
    };

    // 表格配置项
    const columns = reactive<ColumnProps<User.ResUserList>[]>([
        { type: "selection", fixed: "left", width: 45 },
        { type: "sort", label: "Sort", width: 80 },
        { type: "expand", label: "展开", width: 60 },
        {
            prop: "username",
            label: "用户姓名",
            width: 120,
            search: {
                el: "input",
                tooltip: "我是搜索提示"
            },
            render: userNameRender
        },
        {
            prop: "gender",
            label: "性别",
            // 字典数据（本地数据）
            enum: getGenderStatus(),
            // 字典请求携带参数
            // enum: () => getUserGender({ id: 1 }),
            search: {
                el: "select",
                props: {
                    filterable: true
                }
            },
            fieldNames: {
                label: "genderLabel",
                value: "genderValue"
            },
            render: genderRender
        },
        {
            prop: "age",
            label: "年龄",
            search: {
                render: ageSearchItemRender // 自定义 search 显示内容
            }
        },
        { prop: "idCard", label: "身份证号", search: { el: "input" }, width: 180, align: "left" },
        { prop: "email", label: "邮箱", width: 220, align: "left" },
        { prop: "address", label: "居住地址", width: 220, align: "left" },
        {
            prop: "status",
            label: "用户状态",
            enum: getUserStatus(),
            search: {
                el: "tree-select",
                props: { filterable: true }
            },
            fieldNames: {
                label: "userLabel",
                value: "userStatus"
            },
            width: 120,
            render: scope => {
                return statusRender(scope, BUTTONS, changeStatus);
            }
        },
        {
            prop: "createTime",
            label: "创建时间",
            headerRender,
            width: 180,
            search: {
                el: "date-picker",
                span: 1,
                props: {
                    type: "datetimerange",
                    valueFormat: "YYYY-MM-DD HH:mm:ss"
                },
                defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"]
            }
        },
        { prop: "operation", label: "操作", fixed: "right", width: 240 }
    ]);

    return { columns };
};
