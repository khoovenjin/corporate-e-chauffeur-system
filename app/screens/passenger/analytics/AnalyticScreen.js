import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Screen from '../../../components/Screen';
import AppText from '../../../components/AppText';
import defaultStyles from '../../../config/styles';
import AppButton from '../../../components/AppButton';
import AnalysisGraph from '../../../components/analysis/AnalysisGraph';
import AnalysisPieChart from '../../../components/analysis/AnalysisPieChart';
import NoDataAnimation from '../../../components/NoDataAnimation';
import { sampleRide } from '../../../config/data';

function AnalyticScreen() {
    const [viewMode, setViewMode] = useState(0);
    const [dataPresent, setDataPresent] = useState(false);

    useEffect(()=>{
        console.log('Executed')
        if(sampleRide.length !== 0) setDataPresent(true);
        else setDataPresent(false);
    },[sampleRide])

    return (
        <Screen>
            <View style={styles.headerContainer}>
                <AppText style={styles.header}>Analytics</AppText>
            </View>
            {dataPresent && 
                <>
                    <View style={styles.buttonContainer}>
                        <AppButton
                            title="Rides"
                            onPress={()=>setViewMode(0)}
                            style={styles.rideButton}
                            textStyle={viewMode===0?
                                {fontSize: 12}
                                :
                                {fontSize: 12, color: defaultStyles.colors.primary}
                            }
                            color={viewMode===0? "primary" : "white"}
                        />
                        <AppButton
                            title="Spendings"
                            onPress={()=>setViewMode(1)}
                            style={styles.spendingButton}
                            textStyle={viewMode===1?
                                {fontSize: 12}
                                :
                                {fontSize: 12, color: defaultStyles.colors.primary}
                            }
                            color={viewMode===1? "primary" : "white"}
                        />
                    </View>
                    <ScrollView>
                        <View style={styles.analysisContainer}>
                            <AppText style={styles.text}>Monthly Ride Report</AppText>
                            <View style={styles.graphContainer}>
                                <AnalysisGraph
                                    data={sampleRide}
                                    yLabel="label"
                                    xLabel="value"
                                />
                            </View>
                            <View style={styles.pieChartContainer}>
                                <AppText style={styles.text}>{viewMode==0? ("Ride Preference"): ("Ride Spendings")}</AppText>
                                <AnalysisPieChart 
                                    viewMode={viewMode}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </>
            }
            {!dataPresent && <NoDataAnimation visible={!dataPresent}/>}
        </Screen>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: 60,
        backgroundColor: defaultStyles.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        color: defaultStyles.colors.white,
        fontWeight: 'bold',
        fontSize: 18
    },
    rideButton: {
        width: 70,
        borderRadius: 30,
        padding: 8,
    },
    spendingButton: {
        width: 100,
        borderRadius: 30,
        padding: 8,
        marginLeft: 5
    },
    buttonContainer: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        flexDirection: 'row'
    },
    graphContainer: {
        marginTop: 15
    },
    pieChartContainer: {
        marginTop: 40
    },
    analysisContainer: {
        paddingHorizontal: 10,
        paddingVertical: 25,
        backgroundColor: defaultStyles.colors.light
    },
    text: {
        fontWeight: 'bold',
        color: defaultStyles.colors.primary,
        fontSize: 22,
        alignSelf: 'center'
    }
})

export default AnalyticScreen;