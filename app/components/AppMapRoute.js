import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

import mapStyles from '../config/mapStyles';
import Icon from './Icon';
import defaultStyles from '../config/styles.js';
import AppText from './AppText';

let foregroundSubscription = null

function AppMapRoute({
    origin,
    gpsLocation = false,
    distance,
    duration,
    onReady,
    onCompleted,
    track = true,
    pickUp,
    destination,
    style,
    handleChange,
    handleDistance,
    handleDuration
}) {
    const mapRef = useRef(null);

    // Start location tracking in foreground
    const startForegroundUpdate = async () => {
        // Check if foreground permission is granted
        const { granted } = await Location.getForegroundPermissionsAsync()
        if (!granted) {
            console.log("location tracking denied")
            return
        }

        // Make sure that foreground location tracking is not running
        foregroundSubscription?.remove()

        // Start watching position in real-time
        foregroundSubscription = await Location.watchPositionAsync(
            {// For better logs, we set the accuracy to the most sensitive option
                accuracy: Location.Accuracy.BestForNavigation,
            },
            location => {
                handleChange(location.coords)
            }
        )
    }

    // Stop location tracking in foreground
    const stopForegroundUpdate = () => {
        foregroundSubscription?.remove()
    }

    const trackLocation = async () => {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (!granted) return;

            startForegroundUpdate();
        } catch (error) {
            console.log(error);
        }
    }

    const staticLocation = async (gpsLocation) => {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (!granted) return;
    
            const { coords } = await Location.getCurrentPositionAsync();

            if(gpsLocation){
                handleChange({
                    title: gpsLocation.origin.title,
                    latitude: parseFloat(gpsLocation.origin.latitude),
                    longitude: parseFloat(gpsLocation.origin.longitude),
                    address: gpsLocation.origin.address
                });
            } else{
                if (coords) {
                    const { latitude, longitude } = coords;
                    let response = await Location.reverseGeocodeAsync({ latitude, longitude });
            
                    for (let item of response) {
                        let address = `${item.name}, ${item.street}, ${item.district}, ${item.postalCode} ${item.city}, ${item.region}`;
                        handleChange({title: item.name, latitude: latitude, longitude: longitude, address: address});
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(onCompleted){
            stopForegroundUpdate();
        }
    }, [onCompleted])

    // Request permissions right after starting the app
    useEffect(() => {
        if(track)
            trackLocation()
        else
            staticLocation(gpsLocation)
    }, [])

    useEffect(() => {
        if(!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['origin', 'pickUp', 'destination'], {
            edgePadding: { top: 200, bottom: 200, left: 200, right: 200 }
        })
    }, [origin])

    return (
        <View style={[styles.mapContainer, style]}>
            {distance && duration && (
                <View style={styles.detailsContainer}>
                    <AppText style={styles.distanceText}>Est. Distance: {distance.toFixed(2)} km</AppText>
                    <AppText style={styles.durationText}>Est. Duration: {duration.toFixed(2)} mins</AppText>
                </View>
            )}
            {(origin.latitude && origin.longitude)? 
            (<MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={[style.map, style]}
                customMapStyle={mapStyles}
                // showsUserLocation
                followsUserLocation
                rotateEnabled
                zoomEnabled
                toolbarEnabled
                mapType='mutedStandard'
            >
                {!pickUp && <MapViewDirections
                    origin={{latitude: origin.latitude, longitude: origin.longitude}}
                    destination={{latitude: destination.latitude, longitude: destination.longitude}}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={2}
                    strokeColor={defaultStyles.colors.black}
                    onReady={result => {
                        handleDistance(result.distance);
                        handleDuration(result.duration);
                    }}
                />}
                {pickUp && <>
                    <MapViewDirections
                        origin={{latitude: origin.latitude, longitude: origin.longitude}}
                        destination={{latitude: pickUp.latitude, longitude: pickUp.longitude}}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={2}
                        strokeColor={defaultStyles.colors.black}
                        onReady={result => {
                            handleDistance(result.distance);
                            handleDuration(result.duration);
                        }}
                    />
                    <MapViewDirections
                        origin={{latitude: pickUp.latitude, longitude: pickUp.longitude}}
                        destination={{latitude: destination.latitude, longitude: destination.longitude}}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={2}
                        strokeColor={defaultStyles.colors.red}
                    />
                </>
                }
                {origin && <Marker
                    coordinate={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                    }}
                    title="Origin"
                    description={origin.title}
                    identifier="origin"
                >
                    {pickUp && <Image
                        source={require('../assets/carMarker.png')}
                        style={styles.carImage}
                        resizeMode='cover'
                    />}
                    {!pickUp && !onReady && <Icon 
                        name="record-circle"
                        size={60}
                        backgroundColor={defaultStyles.colors.white}
                        iconColor={defaultStyles.colors.lightblue}
                        viewSize={30}
                    />}
                    {!pickUp && onReady && <Image
                        source={require('../assets/carMarker.png')}
                        style={styles.carImage}
                        resizeMode='cover'
                    />}
                </Marker>}
                {pickUp && <Marker
                    coordinate={{
                        latitude: pickUp.latitude,
                        longitude: pickUp.longitude,
                    }}
                    title="PickUp"
                    description={pickUp.title}
                    identifier="pickUp"
                >
                    <Icon 
                        name="record-circle"
                        size={60}
                        backgroundColor={defaultStyles.colors.white}
                        iconColor={defaultStyles.colors.lightblue}
                        viewSize={30}
                    />
                </Marker>}
                {destination && <Marker
                    coordinate={{
                        latitude: destination.latitude,
                        longitude: destination.longitude,
                    }}
                    title="Destination"
                    description={destination.title}
                    identifier="destination"
                >
                    <Ionicons name="location-sharp" size={35} color={defaultStyles.colors.red}/>
                </Marker>}
            </MapView>)
            : 
            (<MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={[style.map, style]}
                customMapStyle={mapStyles}
                showsUserLocation
                followsUserLocation
                rotateEnabled
                zoomEnabled
                toolbarEnabled
                mapType='mutedStandard'
            />)}
        </View>
    );
}

const styles = StyleSheet.create({
    carImage: {
        width: 28,
        height: 14,
    },
    mapContainer: {
        height: '100%',
        width: '100%',
        alignItems:"center",
        zIndex: 0,
        elevation: 0,
    },
    map: {
        height: '100%',
        width: '100%',
    },
    detailsContainer: {
        position: 'absolute',
        marginLeft: 20,
        marginTop: 70,
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10,
        backgroundColor: defaultStyles.colors.black,
        zIndex: 1,
        elevation: 1,
    },
    distanceText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: defaultStyles.colors.white,
        marginBottom: 10
    },
    durationText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: defaultStyles.colors.white
    }
})

export default AppMapRoute;