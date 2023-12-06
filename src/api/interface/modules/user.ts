import { ReqPage } from "./common";
import type { UploadUserFile } from "element-plus";

// table 管理模块
export namespace User {
    export interface UserParams {
        username: string;
        gender: number;
        idCard: string;
        email: string;
        address: string;
        createTime?: string[];
        status?: number;
    }

    export interface ReqUserParams extends ReqPage {
        username?: string;
        gender?: number;
        idCard?: string;
        email?: string;
        address?: string;
        createTime?: string[];
        status?: number;
    }

    export interface ResUserList {
        id: string;
        username: string;
        gender: string;
        age: number;
        idCard: string;
        email: string;
        address: string;
        createTime: string;
        workStatus: string;
        status: number;
        detail: string;
        children?: ResUserList[];
        photo?: UploadUserFile[];
        avatar?: string;
    }

    export interface ResStatus {
        userLabel: string;
        userValue: number;
    }

    export interface ResGender {
        genderLabel: string;
        genderValue: number;
    }

    export interface ResDepartment {
        id: string;
        name: string;
        children?: ResDepartment[];
    }

    export interface ResRole {
        id: string;
        name: string;
        children?: ResDepartment[];
    }
}
