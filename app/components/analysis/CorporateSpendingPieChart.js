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

import { sampleTrips } from "../../config/data";
import defaultStyles from '../../config/styles';
import AppText from "../AppText";
const screenWidth = Dimensions.get("window").width;

const chartColorPallet = [
    defaultStyles.colors.primary, defaultStyles.colors.mediumblue, defaultStyles.colors.lightblue
]

function CorporateSpendingPieChart({ viewMode }) {
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    let mainData = null;

    function processTripDataToDisplay() {
        const unique_vehicle_options = [... new Set(sampleTrips.map((item)=>item.vehicle_option))];

        const firstProcessedArray = unique_vehicle_options.map((element, index)=>{
            const result = sampleTrips.filter((item)=>
                item.vehicle_option === element
            );

            const moneySpent = result.reduce((acc, item) => acc + (item.price || 0), 0);

            const totalMoneySpent = sampleTrips.reduce((acc, item) => acc + (item.price || 0), 0);

            return {
                id: index+1,
                name: element,
                y: (viewMode == 0) ? moneySpent.toFixed(2) : moneySpent.toFixed(2),
                label: (viewMode == 0) ? `${(moneySpent / totalMoneySpent * 100).toFixed(2)}%` : `${(moneySpent / totalMoneySpent * 100).toFixed(2)}%`,
            }
        });
        
        const midProcessedArray = firstProcessedArray.sort((a,b)=>{
            return parseFloat(b.moneySpentPercentage) - parseFloat(a.moneySpentPercentage)
        }).map((item, index)=>{
            return {
                ...item,
                colorMoneyMonth: chartColorPallet[index]
            }
        });
        
        const finalProcessedArray = midProcessedArray.sort((a,b)=>{
            return parseFloat(b.moneySpentPercentage) - parseFloat(a.moneySpentPercentage)
        }).map((item, index)=>{
            return {
                ...item,
                colorMoneyOverall: chartColorPallet[index]
            }
        }).sort((a,b)=>{ return a.id - b.id });

        mainData = finalProcessedArray;
        return finalProcessedArray;
    }

    function setSelectVehicleByName(name) {
        let vehicle_type = mainData.filter(item => item.name == name)
        setSelectedVehicle(vehicle_type[0])
    }

    function renderChart() {
        let chartData = processTripDataToDisplay();
        let colorScales = chartData.map((item) => {
            return (viewMode == 0) ? item.colorMoneyMonth : item.colorMoneyOverall
        });
        let totalValue = chartData.reduce((a, b) => parseFloat(a) + (parseFloat(b.y) || 0), 0)
        console.log(chartData)
        if(Platform.OS == 'ios')
        {
            return (
                <View style={styles.chartContainer}>
                    <VictoryPie
                        data={chartData}
                        labels={(datum) => `${datum.y}`}
                        radius={({ datum }) => (selectedVehicle && selectedVehicle.name == datum.name) ? screenWidth * 0.4 : screenWidth * 0.4 - 10}
                        cornerRadius={({ datum }) => (selectedVehicle && selectedVehicle.name == datum.name) ? 10 : 3}
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
                                            setSelectVehicleByName(optionName)
                                        }
                                    }]
                                }
                            }
                        }]}
    
                    />
                    <View style={{...styles.pieSummary, left: '39%'}}>
                        <AppText style={{ ...styles.title, textAlign: 'center' }}>${totalValue}</AppText>
                        <AppText style={{ ...styles.subTitle, textAlign: 'center' }}>Spendings</AppText>
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
                            radius={({ datum }) => (selectedVehicle && selectedVehicle.name == datum.name) ? screenWidth * 0.4 : screenWidth * 0.4 - 10}
                            cornerRadius={({ datum }) => (selectedVehicle && selectedVehicle.name == datum.name) ? 10 : 3}
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
                                                setSelectVehicleByName(optionName)
                                            }
                                        }]
                                    }
                                }
                            }]}
                        />
                    </Svg>
                    <View style={{...styles.pieSummary, left: '39%'}}>
                        <AppText style={{ ...styles.title, textAlign: 'center' }}>${totalValue}</AppText>
                        <AppText style={{ ...styles.subTitle, textAlign: 'center' }}>Spendings</AppText>
                    </View>
                </View>
            )
        }
        
    }

    function renderVehicleSummary() {
        let data = processTripDataToDisplay()

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    ...styles.rideListItem,
                    backgroundColor: (selectedVehicle && selectedVehicle.name == item.name) ? item.colorMoneyMonth : defaultStyles.colors.white
                }}
                onPress={() => {
                    let optionName = item.name
                    setSelectVehicleByName(optionName)
                }}
            >
                {/* Name/Category */}
                <View style={styles.summaryContainer}>
                    <View
                        style={{
                            ...styles.summarySubContainer,
                            backgroundColor: (selectedVehicle && selectedVehicle.name == item.name) ? defaultStyles.colors.white : item.colorMoneyMonth,
                        }}
                    />
                    <AppText style={{
                        ...styles.summaryText,
                        color: (selectedVehicle && selectedVehicle.name == item.name) ? defaultStyles.colors.white : defaultStyles.colors.primary,
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}>{item.name}</AppText>
                </View>
                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <AppText style={{
                        ...styles.subTitle,
                        color: (selectedVehicle && selectedVehicle.name == item.name) ? defaultStyles.colors.white : defaultStyles.colors.primary,
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
        <View style={{ flex: 1, backgroundColor: defaultStyles.colors.light }}>
            {
                <View>
                    {renderChart()}
                    {renderVehicleSummary()}
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
    rideListItem: {
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

export default CorporateSpendingPieChart;