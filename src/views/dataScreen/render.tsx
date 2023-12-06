import { useSlots } from "vue";
import { cardItem } from "./interface";
import "./render.scss";

type CardProps = {
    data: Array<cardItem>;
};

/**
 * 卡片渲染器
 * @param card
 * @returns
 */
export const cardRender = (props: CardProps) => {
    return (
        <el-row gutter={12}>
            {props.data.map(item => {
                return (
                    <el-col span={6}>
                        <el-card shadow="hover">
                            <div class="card-container">
                                <div class="flex-auto">
                                    <span class="count">{item.count}</span>
                                    <span
                                        class="ml5 font16"
                                        style={{
                                            color: item.percentColor
                                        }}>
                                        {item.percent}
                                    </span>
                                    <div class="mt10 name">{item.name}</div>
                                </div>
                                <div
                                    class="card-icon"
                                    style={{
                                        backgroundColor: item.iconBackgroundColor
                                    }}>
                                    <i
                                        class={item.iconClass}
                                        style={{
                                            color: item.iconColor
                                        }}></i>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                );
            })}
        </el-row>
    );
};

type chartContainerProps = {
    height: number;
    spans: number[];
    gutter: number;
};

/**
 * chart Container
 * @param props
 * @returns
 */
export const chartContainerRender = (props: chartContainerProps) => {
    let slots = useSlots();
    return (
        <el-row
            gutter={props?.gutter ?? 12}
            class="chart-container">
            {props.spans.map((span, index) => {
                return (
                    <el-col
                        span={span}
                        style={{
                            height: (props?.height ?? 200) + "px"
                        }}>
                        {slots["chart-" + (index + 1)]?.()}
                    </el-col>
                );
            })}
        </el-row>
    );
};
