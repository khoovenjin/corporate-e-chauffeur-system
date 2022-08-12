import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { calculateRideFare } from '../../api/price';

import AppIndicatorSheet from '../../components/bottomsheet/AppIndicatorSheet';
import MatchedAnimation from '../../components/bottomsheet/MatchedAnimation';
import Screen from '../../components/Screen';
import routes from '../../navigation/routes';
import { vehicleOptions } from '../../config/data';
import { onDutyList } from '../../config/data';

function RideAssignScreen({ navigation, route }) {
    const rideDetails = route.params;
    console.log(rideDetails);

    const [loading, setLoading] = useState(true);
    const [driverInfo, setDriverInfo] = useState({});

    const rideFare = calculateRideFare(
        vehicleOptions[rideDetails.rideInfo.rideOption-1].title,
        rideDetails.rideInfo.distance,
        rideDetails.rideInfo.duration
    );

    const getDriver = () => {
        try {
            if(onDutyList.length !== 0) {
                const driver = onDutyList.shift();
                return {
                    _id: driver._id,
                    name: driver.name,
                    phone: driver.phone,
                    email: driver.email,
                    image: driver.image,
                    numberPlate: driver.vehicle.vehicle_no_plate,
                    carModel: driver.vehicle.vehicle_model,
                };
            }
            return {};
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        let timeout = setTimeout(() => {
            if(loading){
                const driverDetails = getDriver();
                if(Object.keys(driverDetails).length !== 0){
                    setDriverInfo(driverDetails);
                    setLoading(false);
                }
            }
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    },[loading, onDutyList])

    return (
        <Screen>
            <View style={styles.container}>
                {loading && <AppIndicatorSheet visible={loading}/>}
                {!loading &&
                    <MatchedAnimation
                        visible={!loading}
                        onDone={()=>{
                            navigation.navigate(
                                routes.RIDE_ON_RIDE,
                                {
                                    ...rideDetails,
                                    rideInfo: {
                                        rideOption: rideDetails.rideInfo.rideOption,
                                        rideFare: rideFare
                                    },
                                    driverDetails: driverInfo
                                }
                            )
                        }}
                    />
                }
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default RideAssignScreen;