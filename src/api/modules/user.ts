import http from "@/api";
import { ResPage, User } from "@/api/interface/index";

/**
 * 获取useProTable表格数据
 * @param params
 * @returns
 */
export const getUserList = (params: User.ReqUserParams) => {
    return http.get<ResPage<User.ResUserList>>(`/user/page`, params, { loading: false });
};

/**
 * 获取树形用户列表
 * @param params
 * @returns
 */
export const getUserTreeList = (params: User.ReqUserParams) => {
    return http.get<ResPage<User.ResUserList>>(`/user/treePage`, params, { loading: false });
};

/**
 * 添加用户
 * @param params
 * @returns
 */
export const addUser = (params: User.ReqUserParams) => {
    return http.post(`/user/add`, params);
};

/**
 * 批量添加用户
 * @param params
 * @returns
 */
export const batchAddUser = (params: FormData) => {
    return http.post(`/user/import`, params);
};

/**
 * 编辑用户
 * @param params
 * @returns
 */
export const editUser = (params: User.UserParams) => {
    return http.post(`/user/edit`, params);
};

/**
 * 删除用户
 * @param params
 * @returns
 */
export const deleteUser = (params: User.UserParams) => {
    return http.post(`/user/delete`, params);
};

/**
 * 切换用户状态
 * @param params
 * @returns
 */
export const changeUserStatus = (params: { id: string; status: number }) => {
    return http.post(`/user/change`, params);
};

/**
 * 获取用户部门列表
 * @returns
 */
export const getUserDepartment = () => {
    return http.get(`/user/getDepartment`, {}, { loading: false });
};

/**
 * 导出用户数据
 * @param params
 * @returns
 */
export const exportUserInfo = (params: User.ReqUserParams) => {
    return http.download(`/user/export`, params);
};

// // 新增用户
// export const addUser = (params: { id: string }) => {
//     return http.post(PORT1 + `/user/add`, params);
// };

// // 批量添加用户
// export const BatchAddUser = (params: FormData) => {
//     return http.post(PORT1 + `/user/import`, params);
// };

// // 编辑用户
// export const editUser = (params: { id: string }) => {
//     return http.post(PORT1 + `/user/edit`, params);
// };

// // 删除用户
// export const deleteUser = (params: { id: string[] }) => {
//     return http.post(PORT1 + `/user/delete`, params);
// };

// // 切换用户状态
// export const changeUserStatus = (params: { id: string; status: number }) => {
//     return http.post(PORT1 + `/user/change`, params);
// };

// // 重置用户密码
// export const resetUserPassWord = (params: { id: string }) => {
//     return http.post(PORT1 + `/user/rest_password`, params);
// };

// // 获取用户状态字典
// export const getUserStatus = () => {
//     return http.get<User.ResStatus[]>(PORT1 + `/user/status`);
// };

// // 获取用户性别字典
// export const getUserGender = () => {
//     return http.get<User.ResGender[]>(PORT1 + `/user/gender`);
// };

// // 获取用户部门列表
// export const getUserDepartment = () => {
//     return http.get<User.ResDepartment[]>(PORT1 + `/user/department`);
// };

// // 获取用户角色字典
// export const getUserRole = () => {
//     return http.get<User.ResRole[]>(PORT1 + `/user/role`);
// };
