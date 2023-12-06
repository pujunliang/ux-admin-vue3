// 请求响应参数（不包含data）
export interface Result {
    code: number;
    msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
    data: T;
}

// 分页响应参数
export interface ResPage<T> {
    list: T[];
    pageNum: number;
    pageSize: number;
    total: number;
}

// 分页请求参数
export interface ReqPage {
    pageNum: number;
    pageSize: number;
}

// 文件上传模块
export namespace Upload {
    export interface ResFileUrl {
        fileUrl: string;
    }
}
