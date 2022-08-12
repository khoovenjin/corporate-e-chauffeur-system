import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { BarChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

import defaultStyles from '../../config/styles';

function AnalysisGraph({ data, yLabel, xLabel, yPrefix = '', ySuffix = '', showBarTops = false, showBarValues = true, xLabelRotation = 0, style = {} }) {
    
    const chartConfig = {
        backgroundGradientFrom: defaultStyles.colors.primary,
        backgroundGradientTo: defaultStyles.colors.mediumblue,
        backgroundGradientFromOpacity: 1,
        backgroundGradientToOpacity: 1,
        fillShadowGradient: defaultStyles.colors.white,
        fillShadowGradientOpacity: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        barPercentage: 0.35,
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
        barRadius : 3,
       
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
        <BarChart
            style={styles.barChart}
            data={dataSet}
            width={screenWidth*0.95}
            height={screenHeight*0.35}
            withVerticalLabels
            withHorizontalLabels
            withInnerLines
            yAxisLabel={yPrefix}
            yAxisSuffix={ySuffix}
            showBarTops={showBarTops}
            showValuesOnTopOfBars={showBarValues}
            chartConfig={{...chartConfig, ...tempChartConfig}}
            verticalLabelRotation={xLabelRotation}
            yLabelsOffset={20}
        />
    );
}

const styles = StyleSheet.create({
    barChart: {
        borderRadius: 10
    }
})

export default AnalysisGraph;