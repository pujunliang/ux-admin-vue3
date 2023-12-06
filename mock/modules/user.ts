import Mock from "mockjs";
import { ResultEnum, RequestEnum } from "@/enums/httpEnum.ts";

// const Random = Mock.Random;
const data = Mock.mock({
    "list|500": [
        {
            "id|+1": 1,
            username: "@cname",
            "gender|1": ["男", "女"],
            "age|10-30": 1,
            email: "@EMAIL",
            address: "@county(true)",
            idCard: "@string('number', 14)",
            "status|1": [0, 1],
            "workStatus|1": ["1", "2", "3", "4", "5"],
            detail: "",
            createTime: "@datetime"
        }
    ]
});

/**
 * 树形数据
 */
const treeData = Mock.mock({
    "list|500": [
        {
            id: "@string('number', 18)",
            username: "@cname",
            "gender|1": ["男", "女"],
            "age|10-30": 1,
            email: "@EMAIL",
            address: "@county(true)",
            idCard: "@string('number', 14)",
            "status|1": [0, 1],
            "workStatus|1": ["1", "2", "3", "4", "5"],
            detail: "",
            "children|4": [
                {
                    id: "@string('number', 18)",
                    username: "@cname",
                    "gender|1": ["男", "女"],
                    "age|10-30": 1,
                    email: "@EMAIL",
                    address: "@county(true)",
                    idCard: "@string('number', 14)",
                    "status|1": [0, 1],
                    "workStatus|1": ["1", "2", "3", "4", "5"],
                    detail: "",
                    createTime: "@datetime"
                }
            ],
            createTime: "@datetime"
        }
    ]
});

export default [
    {
        url: "/api/user/add",
        method: RequestEnum.POST,
        response: option => {
            const dataItem = JSON.parse(option.body);
            dataItem.id = data.list.length + 1;
            data.list.push(dataItem);
            return {
                code: ResultEnum.SUCCESS,
                message: "新增成功",
                data: dataItem
            };
        }
    },
    {
        url: "/api/user/delete",
        method: RequestEnum.POST,
        response: option => {
            const id = JSON.parse(option.body).id;
            const index: number = data.list.findIndex(item => item.id === id);
            data.list.splice(index, 1);
            return {
                code: ResultEnum.SUCCESS,
                message: "删除成功"
            };
        }
    },
    {
        url: "/api/user/update",
        method: RequestEnum.POST,
        response: option => {
            const dataItem = JSON.parse(option.body);
            const index: number = data.list.findIndex(item => item.id === dataItem.id);
            data.list.splice(index, 1);
            return {
                code: ResultEnum.SUCCESS,
                message: "更新成功"
            };
        }
    },
    {
        url: "/api/user/change",
        method: RequestEnum.POST,
        response: option => {
            const param = JSON.parse(option.body);
            let item: any = data.list.find(item => item.id === param.id);
            item.status = param.status;
        }
    },
    {
        url: "/api/user/export",
        method: RequestEnum.POST,
        response: () => {
            return "演示环境暂不能导出数据🙅";
        }
    },
    {
        url: "/api/user/page",
        method: RequestEnum.GET,
        response: option => {
            const { pageNum, pageSize } = option.query;
            const start: number = (pageNum - 1) * pageSize;
            const end: number = pageNum * pageSize;
            const list = data.list.slice(start, end);
            return {
                code: ResultEnum.SUCCESS,
                message: "查询成功",
                data: {
                    list,
                    pageNum,
                    pageSize,
                    total: data.list.length
                }
            };
        }
    },
    {
        url: "/api/user/treePage",
        method: RequestEnum.GET,
        response: option => {
            const { pageNum, pageSize } = option.query;
            const start: number = (pageNum - 1) * pageSize;
            const end: number = pageNum * pageSize;
            const list = treeData.list.slice(start, end);
            return {
                code: ResultEnum.SUCCESS,
                message: "查询成功",
                data: {
                    list,
                    pageNum,
                    pageSize,
                    total: treeData.list.length
                }
            };
        }
    },
    {
        url: "/api/user/getDepartment",
        method: RequestEnum.GET,
        response: () => {
            return {
                code: ResultEnum.SUCCESS,
                data: [
                    {
                        id: "1",
                        name: "华东分部",
                        children: [
                            {
                                id: "11",
                                name: "研发部"
                            },
                            {
                                id: "12",
                                name: "市场部"
                            },
                            {
                                id: "13",
                                name: "商务部"
                            },
                            {
                                id: "14",
                                name: "财务部"
                            }
                        ]
                    },
                    {
                        id: "2",
                        name: "华南分部",
                        children: [
                            {
                                id: "21",
                                name: "研发部"
                            },
                            {
                                id: "22",
                                name: "市场部"
                            },
                            {
                                id: "23",
                                name: "商务部"
                            },
                            {
                                id: "24",
                                name: "财务部"
                            }
                        ]
                    },
                    {
                        id: "3",
                        name: "西北分部",
                        children: [
                            {
                                id: "31",
                                name: "研发部"
                            },
                            {
                                id: "32",
                                name: "市场部"
                            },
                            {
                                id: "33",
                                name: "商务部"
                            },
                            {
                                id: "34",
                                name: "财务部"
                            }
                        ]
                    }
                ],
                msg: "成功"
            };
        }
    }
];
