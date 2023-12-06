import _ from "lodash";

/**
 * 创建图表
 * @param options 配置
 */
export const createChartOption = (options: any) => {
    const baseOption = {
        chart: {
            background: "#fff",
            toolbar: { show: false }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: "smooth"
        },
        title: {
            text: "图标标题",
            align: "left",
            offsetY: 16,
            offsetX: 8,
            style: {
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "SF Pro SC, SF Pro Display",
                color: "#263238"
            }
        },

        legend: {
            show: true,
            position: "top",
            horizontalAlign: "right",
            fontSize: "14px",
            offsetY: -16,
            markers: {
                width: 16,
                height: 8,
                radius: 1
            }
        },
        grid: {
            borderColor: "#f5f5f5"
        }
    };
    return _.merge(baseOption, options);
};

/**
 * 面积图表配置
 * @returns
 */
export const areaChartOption = createChartOption({
    title: {
        text: "政策补贴额度"
    },
    xaxis: {
        type: "datetime",
        axisBorder: {
            color: "#f5f5f5"
        },
        axisTicks: {
            borderType: "solid",
            color: "#f5f5f5"
        },
        categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z"
        ]
    },
    yaxis: {
        tickAmount: 8
    },
    tooltip: {
        x: {
            format: "dd/MM/yy HH:mm"
        }
    }
});

/**
 * 环状图配置
 * @returns
 */
export const pieChartOption = createChartOption({
    title: {
        text: "房屋建筑工程"
    },
    chart: {
        type: "donut"
    },
    legend: {
        position: "right",
        offsetY: 90,
        height: 150
    },
    grid: {
        padding: {
            top: 50
        }
    },
    responsive: [
        {
            breakpoint: 480,
            options: {
                legend: {
                    position: "right"
                }
            }
        }
    ]
});

export const lineChartOption = createChartOption({
    chart: {
        type: "line",
        stacked: false
    },
    stroke: {
        width: [0, 2, 5],
        curve: "smooth"
    },
    plotOptions: {
        bar: {
            columnWidth: "50%"
        }
    },

    fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
        }
    },
    labels: [
        "01/01/2003",
        "02/01/2003",
        "03/01/2003",
        "04/01/2003",
        "05/01/2003",
        "06/01/2003",
        "07/01/2003",
        "08/01/2003",
        "09/01/2003",
        "10/01/2003",
        "11/01/2003"
    ],
    markers: {
        size: 0
    },
    xaxis: {
        type: "datetime"
    },
    yaxis: {
        title: {
            text: "Points"
        },
        min: 0
    },
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                }
                return y;
            }
        }
    }
});

export const radarChartOption = createChartOption({
    chart: {
        height: 350,
        type: "radar",
        dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
        }
    },
    title: {
        text: "年度效益统计"
    },
    stroke: {
        width: 2
    },
    fill: {
        opacity: 0.1
    },
    grid: {
        padding: {
            top: 20,
            left: 100
        }
    },
    markers: {
        size: 0
    },
    legend: {
        position: "right",
        offsetY: 90,
        height: 150
    },
    xaxis: {
        categories: ["2011", "2012", "2013", "2014", "2015", "2016"]
    }
});
