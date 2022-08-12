import React, {useState, useEffect} from 'react';
import { View, StyleSheet, FlatList, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";
const windowHeight = Dimensions.get('window').height;

import Screen from '../../components/Screen.js';
import defaultStyles from '../../config/styles.js';
import Icon from '../../components/Icon.js';
import AppMapRoute from '../../components/AppMapRoute.js';
import AppText from '../../components/AppText.js';
import CarListItem from '../../components/CarListItem';
import PaymentListItem from '../../components/PaymentListItem.js';
import AppButton from '../../components/AppButton.js';
import ListItemSeperator from '../../components/ListItemSeperator.js';
import ButtonPicker from '../../components/ButtonPicker.js';
import routes from '../../navigation/routes.js';
import { vehicleOptions } from '../../config/data.js';
import { calculateRideFare } from '../../api/price.js';
// import { paymentOptions } from '../../config/data.js';
import passengerApi from '../../api/passenger.js';

function RideBookingScreen({ navigation, route }) {
    const {user} = useAuth();
    const gpsLocation = route.params;
    const isFocused = useIsFocused();

    // Define position state: {latitude: number, longitude: number}
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [position, setPosition] = useState({});
    const [rideOption, setRideOption] = useState(1);
    const [paymentOption, setPaymentOption] = useState(0);
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [userInfo, setUserInfo] = useState({});

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
    }

    useEffect(()=>{
        getUserInfo();
        console.log(paymentOptions)
    },[])

    useEffect(()=>{
        if (route.params.paymentSelection) {
            console.log('Activated2')
            setPaymentOption(parseInt(route.params.paymentSelection));
        }
        console.log('Activated1')
        console.log(route.params.paymentSelection);
        setPaymentOption(parseInt(route.params.paymentSelection));
    },[isFocused])

    return (
        <Screen>
            <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                <View style={styles.icon}>
                    <Icon
                        name="chevron-left"
                        backgroundColor={defaultStyles.colors.white}
                        iconColor={defaultStyles.colors.primary}
                        size={65}
                        viewSize={40}
                    />
                </View>
            </TouchableWithoutFeedback>
            <AppMapRoute
                origin={position}
                gpsLocation={gpsLocation}
                distance={distance}
                duration={duration}
                track={false}
                destination={{
                    title: gpsLocation.destination.title,
                    latitude: parseFloat(gpsLocation.destination.latitude),
                    longitude: parseFloat(gpsLocation.destination.longitude),
                    address: gpsLocation.destination.address
                }}
                style={{width: '100%', height: '85%'}}
                handleChange={(updatedPosition) => setPosition(updatedPosition)}
                handleDistance={(updatedDistance) => setDistance(updatedDistance)}
                handleDuration={(updatedDuration) => setDuration(updatedDuration)}
            />
            <View style={styles.detailsContainer}>
                <View style={{padding: 15, paddingBottom: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                    <View style={{width: '100%', flexDirection: 'row', paddingBottom: 5, alignItems: 'center'}}>
                        <View style={{flex: 1}}>
                            <AppText style={{fontSize: 15, fontWeight: 'bold'}}>Suggested Rides</AppText>
                        </View>
                        <ButtonPicker 
                            ButtonComponent = {
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <AppText style={{fontSize: 13, fontWeight: 'bold', color: defaultStyles.colors.primary, marginRight: 3}}>View All</AppText>
                                    <MaterialCommunityIcons name="chevron-double-up" size={20} color={defaultStyles.colors.medium}/>
                                </View>
                            }
                            rideOption={{rideOption: rideOption, distance: distance, duration: duration}}
                            handleSelect={(id)=>setRideOption(id)}
                        />
                    </View>
                    <FlatList 
                        data={vehicleOptions.filter(elem => elem.id === rideOption)}
                        keyExtractor={vehicle => vehicle.id.toString()}
                        renderItem={({ item }) => 
                            <CarListItem
                                title={item.title}
                                subTitle={item.description}
                                icon={item.icon}
                                styleTitle={defaultStyles.recentTitle}
                                price={calculateRideFare(item.title, distance, duration)}
                            />
                        }
                    />
                </View>
                <ListItemSeperator style={styles.detailsLining} />
                <View style={{paddingHorizontal: 15, paddingTop: 10, flex: 1}}>
                    {paymentOptions.length !== 0? (
                        <PaymentListItem
                            title="Corporate"
                            subTitle={paymentOptions[paymentOption].name}
                            icon="account-group"
                            size={20}
                            color={defaultStyles.colors.white}
                            onPress={()=>{
                                navigation.navigate(routes.RIDE_PAYMENT,
                                    {...gpsLocation, paymentSelection: paymentOption})
                            }}
                        />
                    )
                    :
                    (
                        <PaymentListItem
                            subTitle="No Payment Connection Set-Up"
                            subTitleStyle={{
                                color: defaultStyles.colors.secondary,
                                fontSize: 15
                            }}
                            icon="account-group"
                            size={20}
                            color={defaultStyles.colors.white}
                            onPress={()=>{
                                console.log(paymentOptions, paymentOption)
                                navigation.navigate(routes.RIDE_PAYMENT, gpsLocation)
                            }}
                        /> 
                    )}
                    <View style={{marginTop: 5}}>
                        <AppButton
                            title={`Book ${vehicleOptions[rideOption-1].title}`}
                            onPress={()=>{
                                if(paymentOptions.length === 0){
                                    Alert.alert('No Payment Connection!', 'Kindly connect to a payment account to proceed.',
                                        [{ text: 'Okay' }]
                                    )
                                } else {
                                    navigation.navigate(
                                        routes.RIDE_ASSIGN,
                                        {
                                            ...gpsLocation,
                                            paymentSelection: paymentOption,
                                            rideInfo: {
                                                rideOption: rideOption,
                                                distance: parseFloat(distance).toFixed(2),
                                                duration: parseFloat(duration).toFixed(2)
                                            }
                                        }
                                    )
                                }
                            }}
                            color="primary"
                            textStyle={{fontSize: 16}}
                        />
                    </View>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        margin: 20,
        zIndex: 1,
        elevation: 1
    },
    detailsContainer: {
        height: windowHeight*0.35,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: defaultStyles.colors.white,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    detailsLining: {
        marginTop: 1,
        height: 2,
        opacity: 0.7
    }
})

export default RideBookingScreen;