import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Screen from '../../../components/Screen';
import AppText from '../../../components/AppText';
import defaultStyles from '../../../config/styles';
import AppButton from '../../../components/AppButton';
import AnalysisBizierGraph from '../../../components/analysis/AnalysisBizierGraph';
import CorporateSpendingPieChart from '../../../components/analysis/CorporateSpendingPieChart';
import CorporatePreferencePieChart from '../../../components/analysis/CorporatePreferencePieChart';
import NoDataAnimation from '../../../components/NoDataAnimation';
import { sampleRide } from '../../../config/data';

function CorporateAnalyticScreen() {
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
                            title="Month"
                            onPress={()=>setViewMode(0)}
                            style={styles.earningButton}
                            textStyle={viewMode===0?
                                {fontSize: 12}
                                :
                                {fontSize: 12, color: defaultStyles.colors.primary}
                            }
                            color={viewMode===0? "primary" : "white"}
                        />
                        <AppButton
                            title="Overall"
                            onPress={()=>setViewMode(1)}
                            style={styles.careerButton}
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
                            <AppText style={styles.text}>Monthly Income Report</AppText>
                            <View style={styles.graphContainer}>
                                <AnalysisBizierGraph
                                    data={sampleRide}
                                    yLabel="label"
                                    xLabel="value"
                                />
                            </View>
                            <View style={styles.pieChartContainer}>
                                <AppText style={styles.text}>{viewMode==0? "Monthly Ride Preference" : "Overall Ride Preference"}</AppText>
                                <CorporatePreferencePieChart
                                    viewMode={viewMode}
                                />
                            </View>
                            <View style={styles.pieChartContainer}>
                                <AppText style={styles.text}>{viewMode==0? "Monthly Ride Spendings" : "Overall Ride Spendings"}</AppText>
                                <CorporateSpendingPieChart 
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
    earningButton: {
        width: 90,
        borderRadius: 30,
        padding: 8,
    },
    careerButton: {
        width: 80,
        borderRadius: 30,
        padding: 8,
        marginLeft: 5
    },
    buttonContainer: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        flexDirection: 'row',
    },
    graphContainer: {
        marginTop: 15,
    },
    pieChartContainer: {
        marginTop: 40,
    },
    analysisContainer: {
        paddingHorizontal: 10,
        paddingVertical: 25,
        backgroundColor: defaultStyles.colors.light,
    },
    text: {
        fontWeight: 'bold',
        color: defaultStyles.colors.primary,
        fontSize: 22,
        alignSelf: 'center'
    },
})

export default CorporateAnalyticScreen;