import { User } from "@/api/interface";
import { ElMessage } from "element-plus";
import { HeaderRenderScope, RenderScope } from "@/components/ProTable/interface";
import { isObject } from "@/utils/is";

/**
 * 自定义渲染表头（使用tsx语法）
 * @param scope
 * @returns
 */
export const headerRender = (scope: HeaderRenderScope<User.ResUserList>) => {
    return (
        <el-button
            type="primary"
            onClick={() => ElMessage.success("我是通过 tsx 语法渲染的表头")}>
            {scope.column.label}
        </el-button>
    );
};

/**
 * 用户名列渲染
 * @param scope
 * @returns
 */
export const userNameRender = (scope: RenderScope<any>) => {
    return (
        <el-button
            type="primary"
            link
            onClick={() => ElMessage.success("我是通过 tsx 语法渲染的内容")}>
            {scope.row.username}
        </el-button>
    );
};

/**
 * 性别列渲染
 * @param scope
 * @returns
 */
export const genderRender = (scope: RenderScope<any>) => {
    return <el-tag type={scope.row.gender == "男" ? "success" : "danger"}>{scope.row.gender}</el-tag>;
};

/**
 * 状态列渲染
 * @param scope
 * @param BUTTONS
 * @param changeStatus
 * @returns
 */
export const statusRender = (scope: RenderScope<any>, BUTTONS: any | boolean, changeStatus: Function | undefined) => {
    return (
        <>
            {isObject(BUTTONS) && BUTTONS.value.status ? (
                <el-switch
                    model-value={scope.row.status}
                    active-text={scope.row.status ? "启用" : "禁用"}
                    active-value={1}
                    inactive-value={0}
                    onClick={() => changeStatus(scope.row)}
                />
            ) : (
                <el-tag type={scope.row.status ? "success" : "danger"}>{scope.row.status ? "启用" : "禁用"}</el-tag>
            )}
        </>
    );
};

/**
 * 年龄查询项渲染
 * @param param0
 * @returns
 */
export const ageSearchItemRender = ({ searchParam }) => {
    return (
        <div class="flx-center">
            <el-input
                vModel_trim={searchParam.minAge}
                placeholder="最小年龄"
            />
            <span class="mr10 ml10">-</span>
            <el-input
                vModel_trim={searchParam.maxAge}
                placeholder="最大年龄"
            />
        </div>
    );
};
