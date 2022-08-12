import React, {useState, useEffect} from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import HeaderItem from '../../components/HeaderItem';

import Screen from '../../components/Screen';
import defaultStyles from '../../config/styles.js';
import Icon from '../../components/Icon';
import PaymentListItem from '../../components/PaymentListItem';
import ListItemSeperator from '../../components/ListItemSeperator';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import routes from '../../navigation/routes';
import useAuth from '../../auth/useAuth';
import passengerApi from '../../api/passenger';
// import { paymentOptions } from '../../config/data.js'

function RidePaymentScreen({ navigation, route }) {
    const {user} = useAuth();
    const gpsLocation = route.params;
    const paymentOption = parseInt(gpsLocation.paymentSelection);
    // const selectedID = selected+1;

    const [paymentOptions, setPaymentOptions] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [selectedID, setSelectedID] = useState();

    const commonError = () => {
        Alert.alert('Error!', 'An unexpected error occured.',
            [{ text: 'Okay'}]
        )
    }

    const getUserInfo = async () => {
        const getResult = await passengerApi.getPassengerById(user.userId.toString());

        if(!getResult.ok){
            commonError();
            return;
        }

        setUserInfo(getResult.data);
        setPaymentOptions(getResult.data.corp_con);

        if(getResult.data.corp_con.length !== 0){
            setSelectedID(getResult.data.corp_con[paymentOption]._id)
        }
    }

    useEffect(()=>{
        getUserInfo();
    },[])

    return (
        <Screen>
            <HeaderItem
                title="Go Back"
                IconComponent={
                    <Icon
                        name="keyboard-backspace"
                        backgroundColor={defaultStyles.colors.primary}
                        iconColor={defaultStyles.colors.white}
                    />
                }
                styleObject={defaultStyles.headerStyle}
                onPress={()=>navigation.goBack()}
            />
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <AppText style={styles.text}>Payment Connections</AppText>
                </View>
                {paymentOptions.length !== 0? 
                    (<>
                        <View style={styles.selectedContainer}>
                            <PaymentListItem
                                subTitle={paymentOptions[paymentOption].name}
                                icon="account-group"
                                size={20}
                                color={defaultStyles.colors.white}
                                backgroundColor={defaultStyles.colors.primary}
                                onPress={()=>navigation.goBack()}
                            />
                        </View>
                        {paymentOptions.length > 1 && <FlatList 
                            data={paymentOptions.filter(elem => elem._id !== selectedID)}
                            keyExtractor={payment => payment._id.toString()}
                            renderItem={({ item, index }) => 
                                <PaymentListItem
                                    subTitle={item.name}
                                    icon="account-group"
                                    size={20}
                                    color={defaultStyles.colors.white}
                                    backgroundColor={defaultStyles.colors.primary}
                                    containerStyle={{padding: 7}}
                                    onPress={()=>{
                                        navigation.navigate({
                                            name: routes.RIDE_BOOKING,
                                            params: {
                                                ...gpsLocation,
                                                paymentSelection: index-1
                                            },
                                            merge: true
                                        })
                                    }}
                                />
                            }
                            ItemSeparatorComponent={() => <ListItemSeperator style={styles.seperator}/>}
                        />}
                    </>)
                :
                    (
                        <View style={styles.paymentMissingContainer}>
                            <AppText style={styles.paymentMissing}>No Payment Connection Set-Up</AppText>
                        </View>
                    )
                }
                <View style={styles.button}>
                    <AppButton
                        title="Add Payment Connection"
                        onPress={()=>navigation.navigate(routes.RIDE_ADD_PAYMENT, gpsLocation)}
                        color="primary"
                        textStyle={{fontSize: 15}}
                    />
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    textContainer: {
        marginBottom: 20
    },
    text: {
        fontWeight: 'bold'
    },
    seperator: {
        width: '100%',
        margin: 5
    },
    button: {
        marginTop: 15
    },
    paymentMissingContainer: {
        marginVertical: 15,
        justifyContent: 'center'
    },
    paymentMissing: {
        fontWeight: 'bold',
        fontSize: 26,
        color: defaultStyles.colors.secondary,
        opacity: 0.8
    },
    selectedContainer: {
        borderRadius: 10,
        borderColor: defaultStyles.colors.limegreen,
        borderWidth: 1,
        padding: 5
    }
})

export default RidePaymentScreen;