import React, {useState} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

import defaultStyles from '../../config/styles';

function AnalysisBizierGraph({ data, yLabel, xLabel, yPrefix = '', ySuffix = '', style = {} }) {
    let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })

    const chartConfig = {
        backgroundGradientFrom: defaultStyles.colors.primary,
        backgroundGradientTo: defaultStyles.colors.mediumblue,
        backgroundGradientFromOpacity: 1,
        backgroundGradientToOpacity: 1,
        fillShadowGradient: defaultStyles.colors.white,
        fillShadowGradientOpacity: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForBackgroundLines: {
            strokeWidth: 0.2,
            stroke: defaultStyles.colors.white,
            strokeDasharray: '4',
        },
        propsForLabels: {
            fontWeight: 'bold',
            ...defaultStyles.text,
            fontSize: 12,
        },
        propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: defaultStyles.colors.lightpurple
        }
    };

    const tempChartConfig = {
        ...style
    };

    const dataConverter = (dataSet) => {
        return {
            labels: dataSet.map(( item ) => item[yLabel]),
            datasets: [
                {
                    data: dataSet.map(( item ) => item[xLabel])
                }
            ]
        }
    };

    const dataSet = dataConverter(data);

    return (
        <LineChart
            style={styles.lineChart}
            data={dataSet}
            width={screenWidth*0.95}
            height={screenHeight*0.35}
            withVerticalLabels
            withHorizontalLabels
            withInnerLines
            yAxisLabel={yPrefix}
            yAxisSuffix={ySuffix}
            bezier
            chartConfig={{...chartConfig, ...tempChartConfig}}
            yLabelsOffset={20}
            decorator={() => {
                return tooltipPos.visible ? <View>
                    <Svg>
                        <Rect
                            x={tooltipPos.x - 15} 
                            y={tooltipPos.y + 10} 
                            width="40" 
                            height="30"
                            fill="black"
                        />
                        <TextSVG
                            x={tooltipPos.x + 5}
                            y={tooltipPos.y + 30}
                            fill="white"
                            fontSize="16"
                            fontWeight="bold"
                            textAnchor="middle">
                            {tooltipPos.value}
                        </TextSVG>
                    </Svg>
                </View> : null
            }}
            onDataPointClick={(data) => {
                let isSamePoint = (tooltipPos.x === data.x 
                    && tooltipPos.y === data.y)

                isSamePoint ?
                    setTooltipPos((previousState) => {
                        return { 
                            ...previousState,
                            value: data.value,
                            visible: !previousState.visible
                        }
                    })
                : 
                setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true });
            }}
        />
    );
}

const styles = StyleSheet.create({
    lineChart: {
        borderRadius: 10
    }
})

export default AnalysisBizierGraph;