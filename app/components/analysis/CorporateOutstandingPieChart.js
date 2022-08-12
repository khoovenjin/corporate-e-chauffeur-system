import React, { useState } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    Platform,
    Dimensions
} from 'react-native';
import { VictoryPie } from 'victory-native';
import { Svg } from 'react-native-svg';

import { sampleOverallTransaction, sampleRide } from "../../config/data";
import defaultStyles from '../../config/styles';
import AppText from "../AppText";
const screenWidth = Dimensions.get("window").width;

const chartColorPallet = [
    defaultStyles.colors.secondary, defaultStyles.colors.green
]

function CorporateOutstandingPieChart() {
    const [selectedMode, setSelectedMode] = useState(null)
    let mainData = null;

    function processWithdrawalsToDisplay() {
        const firstProcessedArray = () => {
            const overallPaid = sampleOverallTransaction.reduce((acc, item) => acc + (item.Transaction_Amount || 0), 0);
            const totalSpending = sampleRide.reduce((acc, item) => acc + (item.value || 0), 0);
            const overallOutstanding = totalSpending - overallPaid;

            return [
                {
                    id: 1,
                    name: 'Paid',
                    y: parseFloat(overallPaid.toFixed(2)),
                    label: `${(overallPaid / totalSpending * 100).toFixed(2)}%`,
                    color: chartColorPallet[1]
                },
                {
                    id: 2,
                    name: 'Outstanding',
                    y: parseFloat(overallOutstanding.toFixed(2)),
                    label: `${(overallOutstanding / totalSpending * 100).toFixed(2)}%`,
                    color: chartColorPallet[0]
                }
            ]
        }

        const finalProcessedArray = firstProcessedArray().sort((a,b)=>{ return a.id - b.id });

        mainData = finalProcessedArray;
        return finalProcessedArray;
    }

    function setSelectModeByName(name) {
        let mode = mainData.filter(item => item.name == name)
        setSelectedMode(mode[0])
    }

    function renderChart() {
        let chartData = processWithdrawalsToDisplay();
        let colorScales = chartData.map((item) => {
            return item.color
        });
        let totalValue = chartData.reduce((a, b) => parseFloat(a) + (parseFloat(b.y) || 0), 0);

        console.log(chartData);
        if(Platform.OS == 'ios')
        {
            return (
                <View style={styles.chartContainer}>
                    <VictoryPie
                        data={chartData}
                        labels={(datum) => `${datum.y}`}
                        radius={({ datum }) => (selectedMode && selectedMode.name == datum.name) ? screenWidth * 0.4 : screenWidth * 0.4 - 10}
                        cornerRadius={({ datum }) => (selectedMode && selectedMode.name == datum.name) ? 10 : 3}
                        padAngle={1.5}
                        innerRadius={60}
                        labelRadius={({ innerRadius }) => (screenWidth * 0.4 + innerRadius) / 2.5}
                        style={styles.pieStyle}
                        width={screenWidth * 0.8}
                        height={screenWidth * 0.8}
                        colorScale={colorScales}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPress: () => {
                                    return [{
                                        target: "labels",
                                        mutation: (props) => {
                                            let optionName = chartData[props.index].name
                                            setSelectModeByName(optionName)
                                        }
                                    }]
                                }
                            }
                        }]}
                    />
                    <View style={{...styles.pieSummary, left: '40%'}}>
                        <AppText style={{ ...styles.title, textAlign: 'center' }}>${totalValue}</AppText>
                        <AppText style={{ ...styles.subTitle, textAlign: 'center' }}>Total</AppText>
                    </View>
                </View>
            )
        }
        else
        {
            // Android workaround by wrapping VictoryPie with SVG
            return (
                <View style={styles.chartContainer}>
                    <Svg width={screenWidth} height={screenWidth} style={{width: "100%", height: "auto"}}>
                        <VictoryPie
                            standalone={false} // Android workaround
                            data={chartData}
                            labels={(datum) => `${datum.y}`}
                            radius={({ datum }) => (selectedMode && selectedMode.name == datum.name) ? screenWidth * 0.4 : screenWidth * 0.4 - 10}
                            cornerRadius={({ datum }) => (selectedMode && selectedMode.name == datum.name) ? 10 : 3}
                            padAngle={1.5}
                            innerRadius={60}
                            labelRadius={({ innerRadius }) => (screenWidth * 0.4 + innerRadius) / 2.5}
                            style={styles.pieStyle}
                            width={screenWidth}
                            height={screenWidth}
                            colorScale={colorScales}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onPress: () => {
                                        return [{
                                            target: "labels",
                                            mutation: (props) => {
                                                let optionName = chartData[props.index].name
                                                setSelectModeByName(optionName)
                                            }
                                        }]
                                    }
                                }
                            }]}
                        />
                    </Svg>
                    <View style={{...styles.pieSummary, left: '40%'}}>
                        <AppText style={{ ...styles.title, textAlign: 'center' }}>${totalValue}</AppText>
                        <AppText style={{ ...styles.subTitle, textAlign: 'center' }}>Total</AppText>
                    </View>
                </View>
            )
        }
        
    }

    function renderWithdrawalSummary() {
        let data = processWithdrawalsToDisplay()

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    ...styles.withdrawalListItem,
                    backgroundColor: (selectedMode && selectedMode.name == item.name) ? item.color : defaultStyles.colors.light
                }}
                onPress={() => {
                    let optionName = item.name
                    setSelectModeByName(optionName)
                }}
            >
                {/* Name/Category */}
                <View style={styles.summaryContainer}>
                    <View
                        style={{
                            ...styles.summarySubContainer,
                            backgroundColor: (selectedMode && selectedMode.name == item.name) ? defaultStyles.colors.white : item.color,
                        }}
                    />
                    <AppText style={{
                        ...styles.summaryText,
                        color: (selectedMode && selectedMode.name == item.name) ? defaultStyles.colors.white : defaultStyles.colors.primary,
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}>{item.name}</AppText>
                </View>
                {/* Withdrawals */}
                <View style={{ justifyContent: 'center' }}>
                    <AppText style={{
                        ...styles.subTitle,
                        color: (selectedMode && selectedMode.name == item.name) ? defaultStyles.colors.white : defaultStyles.colors.primary,
                        fontSize: 14,
                        fontWeight: 'bold'
                    }}>{item.y} USD - {item.label}</AppText>
                </View>
            </TouchableOpacity>
        )

        return (
            <View style={styles.summaryReturn}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                />
            </View>
        )
    }

    return (
        <View style={{ flex: 1}}>
            {
                <View>
                    {renderChart()}
                    {renderWithdrawalSummary()}
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center' 
    },
    title: {
        ...defaultStyles.text,
        fontSize: 30, 
        lineHeight: 36
    },
    subTitle: {
        ...defaultStyles.text,
        fontSize: 16,
        lineHeight: 22
    },
    shadow: {
        shadowColor: defaultStyles.colors.black,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    pieStyle: {
        labels: {
            fill: defaultStyles.colors.white,
            ...defaultStyles.text,
            fontSize: 15,
            lineHeight: 22,
            fontWeight: 'bold'
        },
        parent: {
            shadowColor: defaultStyles.colors.black,
            shadowOffset: {
                width: 2,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
        },
    },
    pieSummary: {
        position: 'absolute',
        top: '42%',
        left: '45%'
    },
    withdrawalListItem: {
        flexDirection: 'row',
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    summaryContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    summarySubContainer: {
        width: 20,
        height: 20,
        borderRadius: 5,
    },
    summaryText: {
        marginLeft: 8,
        ...defaultStyles.text,
        fontSize: 16,
        lineHeight: 22
    },
    summaryReturn: {
        padding: 24
    }
})

export default CorporateOutstandingPieChart;