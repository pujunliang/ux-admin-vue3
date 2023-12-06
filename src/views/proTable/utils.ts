import { GenderEnum, EnableEnum } from "@/enums/golbalEnum";
import { UserStatus, GenderStatus } from "./interface";

/**
 * 获取性别状态配置
 * @returns
 */

const getGenderStatus = (): GenderStatus[] => {
    return [
        {
            genderLabel: GenderEnum[1].toString(),
            genderValue: GenderEnum.男
        },
        {
            genderLabel: GenderEnum[2].toString(),
            genderValue: GenderEnum.女
        }
    ];
};
/**
 * 获取用户状态配置
 * @returns
 */
const getUserStatus = (): UserStatus[] => {
    return [
        {
            userLabel: EnableEnum[0].toString(),
            userStatus: EnableEnum.禁用,
            tagType: "danger"
        },
        {
            userLabel: EnableEnum[1].toString(),
            userStatus: EnableEnum.启用,
            tagType: "success"
        }
    ];
};

/**
 * 工作状态配置
 */
const workStatusConfig = {
    "1": {
        label: "在职",
        icon: "ri-user-line"
    },
    "2": {
        label: "待培训",
        icon: "ri-notification-line"
    },
    "3": {
        label: "待上岗",
        icon: "ri-time-line"
    },
    "4": {
        label: "已离职",
        icon: "ri-close-circle-line"
    },
    "5": {
        label: "已退休",
        icon: "ri-check-line"
    }
};

export { getGenderStatus, getUserStatus, workStatusConfig };
