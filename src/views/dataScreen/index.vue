<template>
    <div style="width: 100%; height: 100%">
        <cardRender :data="cardData"></cardRender>
        <chartContainerRender
            :gutter="12"
            :spans="[18, 6]"
            :height="360">
            <template #chart-1>
                <apexchart
                    height="100%"
                    :options="areaChartOption"
                    :series="areaSeries"></apexchart>
            </template>
            <template #chart-2>
                <apexchart
                    height="100%"
                    :options="pieChartOption"
                    :series="donutSeries"></apexchart>
            </template>
        </chartContainerRender>
        <chartContainerRender
            :gutter="12"
            :spans="[8, 16]"
            :height="360">
            <template #chart-1>
                <apexchart
                    height="100%"
                    :options="radarChartOption"
                    :series="radarSeries"></apexchart>
            </template>
            <template #chart-2>
                <apexchart
                    height="100%"
                    :options="lineChartOption"
                    :series="lineSeries"></apexchart>
            </template>
        </chartContainerRender>
    </div>
</template>
<script setup lang="ts" name="dataScreen">
import { cardRender, chartContainerRender } from "./render";
import { cardItem } from "./interface";
import apexchart from "vue3-apexcharts";
import { areaChartOption, pieChartOption, lineChartOption, radarChartOption } from "./config";

const cardData: Array<cardItem> = [
    {
        count: "125,12",
        percent: "-12.32%",
        percentColor: "#EC414D",
        name: "Bug统计信息",
        iconClass: "ri-bug-line",
        iconColor: "#EC414D",
        iconBackgroundColor: "#ffebec"
    },
    {
        count: "653,33",
        percent: "+42.32%",
        percentColor: "#1a73e8",
        name: "在线设备数",
        iconClass: "ri-device-line",
        iconColor: "#34A853",
        iconBackgroundColor: "#dbf7e3"
    },
    {
        count: "125,65",
        percent: "+17.32%",
        percentColor: "#1a73e8",
        name: "年度计划信息",
        iconClass: "ri-calendar-line",
        iconColor: "#F7A825",
        iconBackgroundColor: "#fff1db"
    },
    {
        count: "520,43",
        percent: "-10.01%",
        percentColor: "#EC414D",
        name: "访问统计信息",
        iconClass: "ri-window-line",
        iconColor: "#1a73e8",
        iconBackgroundColor: "#e8f2ff"
    }
];

const areaSeries = [
    {
        name: "方案一",
        data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
        name: "方案二",
        data: [11, 32, 45, 32, 34, 52, 41]
    }
];

const donutSeries = [44, 55, 41, 17, 15];

const lineSeries = [
    {
        name: "TEAM A",
        type: "column",
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    },
    {
        name: "TEAM B",
        type: "area",
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    },
    {
        name: "TEAM C",
        type: "line",
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }
];

const radarSeries = [
    {
        name: "Series 1",
        data: [80, 50, 30, 40, 100, 20]
    },
    {
        name: "Series 2",
        data: [20, 30, 40, 80, 20, 80]
    },
    {
        name: "Series 3",
        data: [44, 76, 78, 13, 43, 10]
    }
];
</script>
<style lang="scss" scoped>
.chart-container {
    margin-top: 12px;
}
</style>
