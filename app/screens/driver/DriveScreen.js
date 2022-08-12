import React, {useState, useEffect, useRef} from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import Screen from '../../components/Screen';
import defaultStyles from '../../config/styles';
import AppText from '../../components/AppText';
import mapStyles from '../../config/mapStyles';
import routes from '../../navigation/routes.js';
import { mapInitial } from '../../config/data.js';
import { passengerRequestList } from '../../config/data.js';

function DriveScreen({ navigation }) {
    const mapRef = useRef(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const [location, setLocation] = useState(null);

    const getLocation = async () => {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (!granted) return;
    
            const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync();
            setLocation({ latitude, longitude });
        } catch (error) {
            console.log(error);
        }
    }

    const getRideRequest = () => {
        try {
            if(passengerRequestList.length !== 0) {
                const requestDetails = passengerRequestList.shift();
                return requestDetails;
            }
            return {};
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
       getLocation();
    },[])

    useEffect(()=> {
        if(isEnabled){
            const requestDetails = getRideRequest();
            if(Object.keys(requestDetails).length !== 0){
                navigation.navigate(routes.DRIVE_FOUND, requestDetails)
                setIsEnabled(false);
            }
        }
    },[isEnabled, passengerRequestList])

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
    };

    return (
        <Screen>
            <View style={styles.headerContainer}>
                <AppText style={styles.header}>ON-WORK</AppText>
                <Switch
                    trackColor={{ false: defaultStyles.colors.medium, true: defaultStyles.colors.medium }}
                    thumbColor={isEnabled ? defaultStyles.colors.limegreen : defaultStyles.colors.secondary}
                    ios_backgroundColor={defaultStyles.colors.white}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={styles.mapContainer}>
                {location && <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    customMapStyle={mapStyles}
                    showsUserLocation
                    followsUserLocation
                    rotateEnabled
                    zoomEnabled
                    toolbarEnabled
                    mapType='mutedStandard'
                    initialRegion={{
                        ...location,
                        latitudeDelta:0.005,
                        longitudeDelta:0.005
                    }}
                />}
                {!location && <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    customMapStyle={mapStyles}
                    showsUserLocation
                    followsUserLocation
                    rotateEnabled
                    zoomEnabled
                    toolbarEnabled
                    mapType='mutedStandard'
                    initialRegion={mapInitial}
                />}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        borderRadius: 20,
        backgroundColor: defaultStyles.colors.light,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        padding: 3,
        margin: 20,
        zIndex: 1,
        elevation: 3,
        shadowColor: defaultStyles.colors.black,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    header: {
        color: defaultStyles.colors.black,
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 5,
        marginLeft: 10
    },
    map: {
        height: '100%',
        width: '100%'
    },
    mapContainer: {
        height: '100%',
        width: '100%',
        alignItems:"center",
        zIndex: 0,
        elevation: 0
    },
})

export default DriveScreen;