import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import Screen from '../../components/Screen.js';
import AppMapRoute from '../../components/AppMapRoute.js';
import AppButton from '../../components/AppButton.js';
import defaultStyles from '../../config/styles';
import routes from '../../navigation/routes.js';
import useAuth from '../../auth/useAuth.js';
import tripApi from '../../api/trip.js';
import chauffeurApi from '../../api/chauffeur.js';

function DriveOnDutyScreen({ navigation, route }) {
    const {user} = useAuth();
    const requestDetails = route.params;
    console.log(requestDetails);

    const [onCompleted, setOnCompleted] = useState(false);
    const [onReady, setOnReady] = useState(false);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [position, setPosition] = useState({})
    const [userInfo, setUserInfo] = useState({});
    const [instanceID, setInstanceID] = useState();

    const commonError = () => {
        Alert.alert('Error!', 'An unexpected error occured.',
            [{ text: 'Okay'}]
        )
    }

    const getUserInfo = async () => {
        const getResult = await chauffeurApi.getChauffeurById(user.userId.toString());

        if(!getResult.ok){
            commonError();
            return;
        }

        setUserInfo(getResult.data);
    }

    useEffect(()=>{
        getUserInfo();
    },[])

    const setCompletedStatus = async () => {
        // const getTripresult = await tripApi.getTripByPassengerId(requestDetails.passengerDetails._id, {
        //     trip_distance: distance,
        //     trip_amount: requestDetails.rideInfo.rideFare
        // })

        // if(!getTripresult.ok){
        //     commonError();
        //     console.log('getTripresult failed')
        //     return;
        // }

        // console.log(getTripresult);

        const TripUpdateStatusresult = await tripApi.updateTripChangeStatus(instanceID ,{
            trip_status: "Completed"
        })

        if(!TripUpdateStatusresult.ok){
            commonError();
            console.log('update trip status failed')
            return;
        }
    }

    const completeConfirm = () => {
        Alert.alert('Confirm', 'Are you sure you want to complete this ride?',
            [
                { 
                    text: 'Yes', onPress: ()=>{
                        setCompletedStatus();
                        setOnCompleted(true);
                        navigation.navigate(routes.DRIVE_MAIN);
                }},
                { text: 'No' }
            ]
        )
    }

    const setTripReady = async () => {
        const tripPushresult = await tripApi.addTrip({
            passenger_Id: requestDetails.passengerDetails._id,
            chauffeur_Id: user.userId.toString(),
            corporate_Id: '62d382659a5f0759b98f476f',
            pick_up_address: {
                latitude: parseFloat(requestDetails.origin.latitude),
                longitude: parseFloat(requestDetails.origin.longitude)
            },
            destination_address: {
                latitude: parseFloat(requestDetails.destination.latitude),
                longitude: parseFloat(requestDetails.destination.longitude)
            },
            trip_distance: parseFloat(distance),
            trip_amount: parseFloat(requestDetails.rideInfo.rideFare),
            vehicle_model: userInfo.vehicle.vehicle_model,
            vehicle_no_plate: userInfo.vehicle.vehicle_no_plate
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
            trip_status: "PickUp"
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

        setInstanceID(tripPushresult.data.data._id)
        setOnReady(true)
    }

    return (
        <Screen>
            <AppMapRoute
                origin={position}
                distance={distance}
                duration={duration}
                onReady={onReady}
                onCompleted={onCompleted}
                pickUp={onReady? 
                    (null)
                    :
                    ({
                        title: requestDetails.origin.title,
                        latitude: parseFloat(requestDetails.origin.latitude),
                        longitude: parseFloat(requestDetails.origin.longitude),
                        address: requestDetails.origin.address
                    })
                }
                destination={{
                    title: requestDetails.destination.title,
                    latitude: parseFloat(requestDetails.destination.latitude),
                    longitude: parseFloat(requestDetails.destination.longitude),
                    address: requestDetails.destination.address
                }}
                style={{width: '100%', height: '95%'}}
                handleChange={(updatedPosition) => setPosition(updatedPosition)}
                handleDistance={(updatedDistance) => setDistance(updatedDistance)}
                handleDuration={(updatedDuration) => setDuration(updatedDuration)}
            />
            <View style={styles.buttonContainer}>
                {!onReady && <AppButton
                    title="PICK-UP COMPLETED"
                    onPress={()=>{
                        setTripReady()
                    }}
                    style={styles.button}
                    textStyle={{fontSize: 14}}
                />}
                {onReady && <AppButton
                    title="RIDE COMPLETED"
                    onPress={completeConfirm}
                    style={styles.button}
                    textStyle={{fontSize: 14}}
                />}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: '13%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        backgroundColor: defaultStyles.colors.lightblue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '80%',
        borderRadius: 30,
        padding: 8,
    }
})

export default DriveOnDutyScreen;