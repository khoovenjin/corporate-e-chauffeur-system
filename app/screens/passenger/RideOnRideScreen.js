import React, { useCallback, useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import defaultStyles from '../../config/styles';
import AppBottomSheet from '../../components/bottomsheet/AppBottomSheet';
import AppBottomField from '../../components/bottomsheet/AppBottomField';
import CompletedAnimation from '../../components/bottomsheet/CompletedAnimation';
import routes from '../../navigation/routes';
import AppMapRoute from '../../components/AppMapRoute';
import passengerApi from '../../api/passenger';
import chauffeurApi from '../../api/chauffeur';
import tripApi from '../../api/trip';
import corporateApi from '../../api/corporate';
import useAuth from '../../auth/useAuth';
import chauffeur from '../../api/chauffeur';

function RideOnRideScreen({ navigation, route }) {
    const {user} = useAuth();
    const rideDetails = route.params;
    console.log(rideDetails);
    const bottomSheetRef = useRef(null);

    const [completed, setCompleted] = useState(false);
    const [onReady, setOnReady] = useState(false);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [position, setPosition] = useState({});
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    const snapPoints = () => {
        return ['33%', '48%'];
    };

    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current.snapToIndex(index);
    }, []);

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

    const rideCompleted = async () => {
        // {
        //     "passenger_Id": "62d36fd37e8e294f8bd13600",
        //     "chauffeur_Id": "62d3759efc5b706e9c171be7",
        //     "corporate_Id": "62d382659a5f0759b98f476f",
        //     "pick_up_address": {
        //         "latitude": 102.8284927,
        //         "longitude": 89.482402
        //     },
        //     "destination_address": {
        //         "latitude": 102.6082942,
        //         "longitude": 89.482174
        //     },
        //     "trip_distance": 26.73,
        //     "trip_amount": 94.34,
        //     "vehicle_model": "Bentley Mulsanne",
        //     "vehicle_no_plate": "VDF 2084"
        // }
        const tripPushresult = await tripApi.addTrip({
            passenger_Id: user.userId.toString(),
            chauffeur_Id: rideDetails.driverDetails._id,
            corporate_Id: '62d382659a5f0759b98f476f',
            pick_up_address: {
                latitude: parseFloat(rideDetails.origin.latitude),
                longitude: parseFloat(rideDetails.origin.longitude)
            },
            destination_address: {
                latitude: parseFloat(rideDetails.destination.latitude),
                longitude: parseFloat(rideDetails.destination.longitude)
            },
            trip_distance: parseFloat(distance),
            trip_amount: parseFloat(rideDetails.rideInfo.rideFare),
            vehicle_model: rideDetails.driverDetails.carModel,
            vehicle_no_plate: rideDetails.driverDetails.numberPlate
        });

        if(!tripPushresult.ok){
            commonError();
            console.log('add trip failed')
            return;
        }

        // {
        //     "trip_status": "Completed"
        // }

        const TripUpdateStatusresult = await tripApi.updateTripChangeStatus(tripPushresult.data.data._id,{
            trip_status: "Completed"
        })

        if(!TripUpdateStatusresult.ok){
            commonError();
            console.log('update trip status failed')
            return;
        }
        // {
        //     "latitude": 102.8284937,
        //     "longitude": 89.482408
        // }
        const TripUpdateGeoresult = await tripApi.updateTripAddGeolocation(tripPushresult.data.data._id,{
            latitude: 102.8284937,
            longitude: 89.482408
        })

        if(!TripUpdateGeoresult.ok){
            commonError();
            console.log('update trip geolocation failed')
            return;
        }

        // {
        //     "chauffeur_Id": "62d3759efc5b706e9c171be7",
        //     "corporate_Id": "62d382659a5f0759b98f476f",
        //     "trip_detail": [
        //             {
        //                 "trip_track_coordinate": {
        //                     "latitude": {
        //                         "$numberDecimal": "102.8284934"
        //                     },
        //                     "longitude": {
        //                         "$numberDecimal": "89.482407"
        //                     }
        //                 },
        //                 "trip_track_time": "2022-07-17T04:21:46.157Z",
        //                 "_id": "62d38e5ad8d2f07cd404231f"
        //             },
        //             {
        //                 "trip_track_coordinate": {
        //                     "latitude": {
        //                         "$numberDecimal": "102.8284937"
        //                     },
        //                     "longitude": {
        //                         "$numberDecimal": "89.482408"
        //                     }
        //                 },
        //                 "trip_track_time": "2022-07-17T04:21:56.128Z",
        //                 "_id": "62d38e64d8d2f07cd4042324"
        //             }
        //         ],
        //     "trip_status": "completed",
        //     "pick_up_address": {
        //         "latitude": 102.8284927,
        //         "longitude": 89.482402
        //     },
        //     "destination_address": {
        //         "latitude": 102.6082942,
        //         "longitude": 89.482174
        //     },
        //     "trip_distance": 26.73,
        //     "trip_amount": 94.34,
        //     "vehicle_model": "Bentley Mulsanne",
        //     "vehicle_no_plate": "VDF 2084"
        // }

        const PassengerAddTripresult = await passengerApi.updatePassengerAddTrip(user.userId.toString(), {
            chauffeur_Id: rideDetails.driverDetails._id,
            corporate_Id: '62d382659a5f0759b98f476f',
            trip_detail: [
                {
                    trip_track_coordinate: {
                        latitude: 102.8284934,
                        longitude: 89.482407
                    },
                    trip_track_time: "2022-07-17T04:21:46.157Z",
                    _id: "62d38e5ad8d2f07cd404231f"
                },
            ],
            trip_status: "completed",
            pick_up_address: {
                latitude: parseFloat(rideDetails.origin.latitude),
                longitude: parseFloat(rideDetails.origin.longitude)
            },
            destination_address: {
                latitude: parseFloat(rideDetails.destination.latitude),
                longitude: parseFloat(rideDetails.destination.longitude)
            },
            trip_distance: parseFloat(distance),
            trip_amount: parseFloat(rideDetails.rideInfo.rideFare),
            vehicle_model: rideDetails.driverDetails.carModel,
            vehicle_no_plate: rideDetails.driverDetails.numberPlate
        })

        if(!PassengerAddTripresult.ok){
            commonError();
            console.log('update passenger add trip failed')
            return;
        }

        const ChauffeurAddTripresult = await chauffeurApi.updateChauffeurAddTrip(rideDetails.driverDetails._id, {
            passenger_Id: user.userId,
            corporate_Id: '62d382659a5f0759b98f476f',
            trip_detail: [
                {
                    trip_track_coordinate: {
                        latitude: 102.8284934,
                        longitude: 89.482407
                    },
                    trip_track_time: "2022-07-17T04:21:46.157Z",
                    _id: "62d38e5ad8d2f07cd404231f"
                },
            ],
            trip_status: "completed",
            pick_up_address: {
                latitude: parseFloat(rideDetails.origin.latitude),
                longitude: parseFloat(rideDetails.origin.longitude)
            },
            destination_address: {
                latitude: parseFloat(rideDetails.destination.latitude),
                longitude: parseFloat(rideDetails.destination.longitude)
            },
            trip_distance: parseFloat(distance),
            trip_amount: parseFloat(rideDetails.rideInfo.rideFare),
            vehicle_model: rideDetails.driverDetails.carModel,
            vehicle_no_plate: rideDetails.driverDetails.numberPlate
        })

        if(!ChauffeurAddTripresult.ok){
            commonError();
            console.log('update chauffeur add trip failed')
            return;
        }

        const CorporateAddTripresult = await corporateApi.updateCorporateAddTrip('62d382659a5f0759b98f476f', {
            passenger_Id: user.userId,
            chauffeur_Id: rideDetails.driverDetails._id,
            trip_detail: [
                {
                    trip_track_coordinate: {
                        latitude: 102.8284934,
                        longitude: 89.482407
                    },
                    trip_track_time: "2022-07-17T04:21:46.157Z",
                    _id: "62d38e5ad8d2f07cd404231f"
                },
            ],
            trip_status: "completed",
            pick_up_address: {
                latitude: parseFloat(rideDetails.origin.latitude),
                longitude: parseFloat(rideDetails.origin.longitude)
            },
            destination_address: {
                latitude: parseFloat(rideDetails.destination.latitude),
                longitude: parseFloat(rideDetails.destination.longitude)
            },
            trip_distance: parseFloat(distance),
            trip_amount: parseFloat(rideDetails.rideInfo.rideFare),
            vehicle_model: rideDetails.driverDetails.carModel,
            vehicle_no_plate: rideDetails.driverDetails.numberPlate
        })

        if(!CorporateAddTripresult.ok){
            commonError();
            console.log('update chauffeur add trip failed')
            return;
        }

        setCompleted(true);
    }

    return (
        <AppBottomSheet>
            <CompletedAnimation
                visible={completed} onDone={()=>navigation.navigate(routes.RIDE_MAIN)}
            />
            <AppMapRoute
                origin={position}
                distance={distance}
                duration={duration}
                onReady={onReady}
                onCompleted={completed}
                pickUp={onReady? 
                    (null)
                    :
                    ({
                        title: rideDetails.origin.title,
                        latitude: parseFloat(rideDetails.origin.latitude),
                        longitude: parseFloat(rideDetails.origin.longitude),
                        address: rideDetails.origin.address
                    })
                }
                destination={{
                    title: rideDetails.destination.title,
                    latitude: parseFloat(rideDetails.destination.latitude),
                    longitude: parseFloat(rideDetails.destination.longitude),
                    address: rideDetails.destination.address
                }}
                style={{width: '100%', height: '90%'}}
                handleChange={(updatedPosition) => setPosition(updatedPosition)}
                handleDistance={(updatedDistance) => setDistance(updatedDistance)}
                handleDuration={(updatedDuration) => setDuration(updatedDuration)}
            />
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints()}
                // onChange={handleSheetChanges}
                overDragResistanceFactor={4}
                // detached
                // enablePanDownToClose
                backgroundStyle={sheetStyles.backgroundStyle}
                handleStyle={sheetStyles.handleStyle}
                handleIndicatorStyle={sheetStyles.handleIndicatorStyle}
            >
                <BottomSheetView>
                    <AppBottomField
                        rideMinutes={duration? duration.toFixed(2): 0}
                        rideTitle={rideDetails.driverDetails.numberPlate}
                        rideSubTitle={rideDetails.driverDetails.carModel}
                        driverTitle={rideDetails.driverDetails.name}
                        image={require('../../assets/driver.png')}
                        handleComplete={()=>{
                            handleSnapPress(0)
                            rideCompleted()
                        }}
                    />
                </BottomSheetView>
            </BottomSheet>
        </AppBottomSheet>
    );
}

const styles = StyleSheet.create({

});

const sheetStyles = StyleSheet.create({
    backgroundStyle: { // entireContainer
        backgroundColor: defaultStyles.colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    handleStyle: { // topHandleContainer
        backgroundColor: defaultStyles.colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    handleIndicatorStyle: { // topHandle
        width: '15%',
        backgroundColor: defaultStyles.colors.medium,
        opacity: 0.6
    }
})

export default RideOnRideScreen;