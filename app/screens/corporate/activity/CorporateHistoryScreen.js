import React, {useState, useEffect} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppText from '../../../components/AppText';
import Screen from '../../../components/Screen';
import defaultStyles from '../../../config/styles';
import NotificationListItem from '../../../components/accountprofile/NotificationListItem';
import AppButton from '../../../components/AppButton';
import DateButtonItem from '../../../components/DateButtonItem';
import NoDataAnimation from '../../../components/NoDataAnimation';
import { ErrorMessage } from '../../../components/form';
import { sampleTrips } from '../../../config/data';

function CorporateHistoryScreen({}) {
    const [startDate, setStartDate] = useState('All Records');
    const [endDate, setEndDate] = useState('All Records');
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorDetail, setErrorDetail] = useState('');
    const [dataPresent, setDataPresent] = useState(false);
    const [paidPresent, setPaidPresent] = useState(false);
    const [viewMode, setViewMode] = useState(0);
    const [sampleTrip, setSampleTrip] = useState([])

    useEffect(()=>{
        console.log('Executed')
        if(sampleTrips.length !== 0) {
            setSampleTrip(sampleTrips);
            setDataPresent(true);
            setPaidPresent(true);
        }
        else {
            setDataPresent(false);
            setPaidPresent(false);
        }
    },[sampleTrips])
    
    const validateFilter = (startingDate, endingDate) => {
        if(startingDate === 'All Records' && endingDate !== 'All Records'){
            setErrorVisible(true);
            setErrorDetail('Please select a Start Date.');
        } else if(new Date(startingDate) > new Date(endingDate)){
            setErrorVisible(true);
            setErrorDetail('Invalid Dates, Start Date must come earlier and End Date must come later');
        } else if(startingDate !== 'All Records' && endingDate === 'All Records'){
            setErrorVisible(true);
            setErrorDetail('Please select an End Date.');
        } else {
            setErrorVisible(false);
            setErrorDetail('');
        }

        const dateConverter = (date) => {
            const auxdate = date.split('/');
            const dateName = (number) => {
                let months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
                return months[number-1];
            }
            return `${dateName(auxdate[1])} ${auxdate[0]} ${auxdate[2]}`
        }

        if(startingDate === 'All Records' && endingDate === 'All Records'){
            // console.log(sampleTrips);
            setSampleTrip(sampleTrips)
            return;
        }

        setSampleTrip(sampleTrips.filter((item)=>{
            
            return new Date(dateConverter(item.date)) >= new Date(startingDate) &&
            new Date(dateConverter(item.date)) <= new Date(endingDate);
        }));
    }

    return (
        <Screen>
            <View style={styles.headerContainer}>
                <AppText style={styles.header}>History</AppText>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton
                    title="Rides"
                    onPress={()=>setViewMode(0)}
                    style={styles.dutyButton}
                    textStyle={viewMode===0?
                        {fontSize: 12}
                        :
                        {fontSize: 12, color: defaultStyles.colors.primary}
                    }
                    color={viewMode===0? "primary" : "light"}
                />
                <AppButton
                    title="Paids"
                    onPress={()=>setViewMode(1)}
                    style={styles.paidButton}
                    textStyle={viewMode===1?
                        {fontSize: 12}
                        :
                        {fontSize: 12, color: defaultStyles.colors.primary}
                    }
                    color={viewMode===1? "primary" : "light"}
                />
            </View>
            {viewMode === 0 && <>
                <View style={styles.subContainer}>
                    <View style={styles.dateContainer}>
                        <DateButtonItem 
                            title="From date"
                            date={startDate}
                            setDate={(dateSelected)=>setStartDate(dateSelected)}
                        />
                        <View style={styles.verticalSeperator} />
                        <DateButtonItem 
                            title="To date"
                            date={endDate}
                            setDate={(dateSelected)=>setEndDate(dateSelected)}
                        />
                    </View>
                    <View style={styles.horizontalSeperator} />
                    <View style={styles.filterContainer}>
                        <View style={styles.filterDetails}>
                            <Ionicons name="options" size={40} color={defaultStyles.colors.primary}/>
                            <AppText style={styles.filter}>Filter</AppText>
                        </View>
                        <View style={styles.buttons}>
                            <AppButton title="Find" onPress={()=>{
                                validateFilter(startDate, endDate);
                                
                            }} style={styles.filterButton} textStyle={{fontSize: 12}}/>
                            <AppButton title="Reset" onPress={()=>{
                                setStartDate('All Records');
                                setEndDate('All Records');
                                setErrorVisible(false);
                                setErrorDetail('');
                            }} style={styles.resetButton} textStyle={{fontSize: 12}}/>
                        </View>
                    </View>
                    <ErrorMessage error={errorDetail} visible={errorVisible}/>
                </View>
                <View style={styles.listingContainer}>
                    {dataPresent && 
                        <FlatList
                            data={sampleTrips}
                            keyExtractor={item=>item.id.toString()}
                            renderItem={({item}) =>
                                <NotificationListItem 
                                    title={item.name}
                                    subTitle={item.description}
                                    icon="car-convertible"
                                    styleTitle={defaultStyles.recentTitle}
                                    onPress={() => console.log("History selected", item)}
                                    date={item.date}
                                />
                            }
                        />
                    }
                    {!dataPresent && <NoDataAnimation visible={!dataPresent} style={{width: '80%'}}/>}
                </View>
            </>}
            {viewMode === 1 &&
                <View style={styles.paidContainer}>
                    {paidPresent && 
                        <FlatList 
                            data={sampleTrip}
                            keyExtractor={notification=>notification.id.toString()}
                            renderItem={({item}) =>
                                <NotificationListItem 
                                    title={item.name}
                                    subTitle={item.description}
                                    icon="bell"
                                    styleTitle={defaultStyles.recentTitle}
                                    onPress={() => console.log("Notification selected", item)}
                                    date={item.date}
                                />
                            }
                        />
                    }
                    {!paidPresent && <NoDataAnimation visible={!paidPresent}/>}
                </View>
            }
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
    listingContainer: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: defaultStyles.colors.white
    },
    subContainer: {
        backgroundColor: defaultStyles.colors.white,
        marginHorizontal: 20,
        marginBottom: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: defaultStyles.colors.white,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 5,
        shadowColor: defaultStyles.colors.black,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    dateContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15
    },
    verticalSeperator: {
        height: '100%',
        width: 2,
        backgroundColor: defaultStyles.colors.light,
    },
    horizontalSeperator: {
        height: 2,
        width: '100%',
        backgroundColor: defaultStyles.colors.light,
    },
    dateTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: defaultStyles.colors.black
    },
    filterContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 5
    },
    filter: {
        color: defaultStyles.colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10
    },
    filterDetails: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    filterButton: {
        width: 60,
        borderRadius: 30,
        padding: 8
    },
    resetButton: {
        width: 70,
        borderRadius: 30,
        padding: 8,
        marginLeft: 5
    },
    buttons: {
        flexDirection: 'row'
    },
    dutyButton: {
        width: 70,
        borderRadius: 30,
        padding: 8,
    },
    paidButton: {
        width: 70,
        borderRadius: 30,
        padding: 8,
        marginLeft: 5
    },
    buttonContainer: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        flexDirection: 'row',
        backgroundColor: defaultStyles.colors.light
    },
    paidContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10
    }
})

export default CorporateHistoryScreen;