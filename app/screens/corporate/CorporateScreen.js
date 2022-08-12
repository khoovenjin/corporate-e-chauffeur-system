import React, {useState, useEffect} from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import AppCard from '../../components/AppCard';

import HeaderItem from '../../components/HeaderItem';
import Screen from '../../components/Screen';
import defaultStyles from '../../config/styles';
import routes from '../../navigation/routes';
import { sampleOverallTransaction, sampleRide, openPaymentList, sampleTrips } from '../../config/data';
import corporateApi from '../../api/corporate';

function CorporateScreen({ navigation }) {
    const {user} = useAuth();
    const [outstanding, setOutstanding] = useState(0);
    const [otp, setOTP] = useState(0);
    const [connection, setConnection] = useState(0);
    const [userInfo, setUserInfo] = useState({});

    let corporateList = [
        {
            title: "Outstanding Settlement",
            unit: "RM",
            value: outstanding,
            details: "Manage outstanding settlements",
            targetScreen: routes.MANAGE_PAY
        },
        {
            title: "One-time Password (OTP)",
            unit: "COUNT",
            value: otp,
            details: "Manage open OTPs",
            targetScreen: routes.MANAGE_OTP
        },
        {
            title: "Corporate Connection",
            unit: "COUNT",
            value: connection,
            details: "Manage connections",
            targetScreen: routes.MANAGE_CONNECTION
        }
    ]

    const commonError = () => {
        Alert.alert('Error!', 'An unexpected error occured.',
            [{ text: 'Okay'}]
        )
    }

    const getUserInfo = async () => {
        const getResult = await corporateApi.getCorporateById(user.userId.toString());

        if(!getResult.ok){
            commonError();
            return;
        }

        setUserInfo(getResult.data);
        setOTP(getResult.data.open_otp.length);
        setConnection(getResult.data.passenger_list.length);
    }

    useEffect(()=>{
        getUserInfo();
    },[])

    useEffect(()=>{
        let outstandingBalance = 0;

        if(sampleRide.length !== 0){
            const totalSpending = sampleRide.reduce((acc, item) => acc + (item.value || 0), 0);
            if(sampleOverallTransaction.length !== 0){
                const overallPaid = sampleOverallTransaction.reduce((acc, item) => acc + (item.Transaction_Amount || 0), 0);
                outstandingBalance = totalSpending - overallPaid;
            } else outstandingBalance = totalSpending;
        }

        const OTPcount = openPaymentList.length;
        const Connectioncount = sampleTrips.length;

        setOutstanding(parseFloat(outstandingBalance.toFixed(2)));
        setConnection(Connectioncount);
    }, [sampleOverallTransaction, sampleRide, openPaymentList, sampleTrips])

    return (
        <Screen>
            <ScrollView>
                <HeaderItem
                    title="Corporate"
                    subTitle="Manage with Ease"
                    styleObject={{justifyContent: 'flex-start', paddingTop: 30}}
                    styleContainer={{alignItems: 'flex-start'}}
                    styleDetailContainer={{justifyContent: 'flex-start'}}
                    titleStyle={{fontSize: 35}}
                />
                <View style={styles.container}>
                    <FlatList 
                        data={corporateList}
                        keyExtractor={listItem => listItem.title.toString()}
                        renderItem={({ item }) => 
                            <AppCard
                                title={item.title}
                                subUnit={item.unit}
                                subTitle={item.value}
                                detailsTitle={item.details}
                                onPress={()=>navigation.navigate(item.targetScreen)}
                            />
                        }
                    />
                </View>
                <View style={styles.end}/>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 110,
        width: '100%',
        flex: 1,
        padding: 10,
        zIndex: 1,
        elevation: 1,
    },
    end: {
        height: 600,
        backgroundColor: defaultStyles.colors.light,
    }
})

export default CorporateScreen;