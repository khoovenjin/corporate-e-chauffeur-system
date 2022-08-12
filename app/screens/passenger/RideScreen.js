import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import Screen from '../../components/Screen.js';
import defaultStyles from '../../config/styles.js';
import HeaderItem from '../../components/HeaderItem.js';
import Icon from '../../components/Icon.js';
import SearchBar from '../../components/SearchBar.js';
import ListItem from '../../components/ListItem.js';
import ListItemSeperator from '../../components/ListItemSeperator.js';
import mapStyles from '../../config/mapStyles.js';
import AppText from '../../components/AppText.js';
import routes from '../../navigation/routes.js';
import { carsCoordinates, recentPlaces, mapInitial } from '../../config/data.js';

function RideScreen({ navigation }) {
    const mapRef = useRef(null);
    const [location, setLocation] = useState(null);
    const [geoReverseLocation, setGeoReverseLocation] = useState('');

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

    const getGeoReverseLocation = async () => {
        try {
            if (location) {
                const { latitude, longitude } = location;
                let response = await Location.reverseGeocodeAsync({ latitude, longitude });
        
                for (let item of response) {
                    let address = `${item.name}, ${item.street}, ${item.district}, ${item.postalCode} ${item.city}, ${item.region}`;
                    setGeoReverseLocation({title: item.name, address: address});
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
       getLocation();
    },[])

    useEffect(()=> {
        getGeoReverseLocation();
    },[location])

    return (
        <Screen>
            <ScrollView>
                <HeaderItem
                    title="Chauffeseur"
                    subTitle="For the expensive tastes"
                    styleObject={{justifyContent: 'flex-start', paddingTop: 30}}
                    styleContainer={{alignItems: 'flex-start'}}
                    styleDetailContainer={{justifyContent: 'flex-start'}}
                    titleStyle={{fontSize: 35}}
                />
                <Image style={styles.image} source={require('../../assets/car.png')}/>
                <SearchBar
                    iconColor={defaultStyles.colors.red}
                    style={defaultStyles.searchBarContainer}
                    onPress={() => navigation.navigate(routes.RIDE_DETAILS, { ...location, title: geoReverseLocation.title, address: geoReverseLocation.address})}
                >
                    Where to?
                </SearchBar>
                <View style={styles.recentPlaces}>
                    <FlatList 
                        data={recentPlaces}
                        keyExtractor={recentPlaces => recentPlaces.id.toString()}
                        renderItem={({ item }) => 
                            <ListItem
                                title={item.title}
                                subTitle={item.address}
                                IconComponent={
                                    <Icon
                                        name='clock'
                                        size={30}
                                        backgroundColor={defaultStyles.colors.primary}
                                        iconColor={defaultStyles.colors.white}
                                    />
                                }
                                styleTitle={defaultStyles.recentTitle}
                                onPress={() => console.log("Message selected", item)}
                            />   
                        }
                        ItemSeparatorComponent={() => <ListItemSeperator style={{width: '85%'}}/>}
                    />
                </View>
                <View style={styles.mapComponent}>
                    <View style={styles.mapTitle}>
                        <AppText style={styles.title}>Nearby Chauffeurs</AppText>
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
                                latitudeDelta:0.015,
                                longitudeDelta:0.015
                            }}
                        >
                            {
                                carsCoordinates.simulateCars.map((item, index) =>
                                <Marker coordinate={item} key={index.toString()}>
                                    <Image
                                        source={require('../../assets/carMarker.png')}
                                        style={styles.carsAround}
                                        resizeMode='cover'
                                    />
                                </Marker>
                                )
                            }
                        </MapView>}
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
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    recentPlaces: {
        top: 40
    },
    map: {
        height: 250,
        width: '100%',
    },
    mapContainer: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        overflow: 'hidden'
    },
    carsAround: {
        width: 28,
        height: 14,
    },
    mapComponent: {
        marginTop: 45,
        paddingHorizontal: 25,
        paddingBottom: 5,
        marginBottom: 20
    },
    mapTitle: {
        width: '92%',
        marginBottom: 10
    },
    title: {
        fontWeight: 'bold'
    },
    image: {
        position: 'absolute',
        resizeMode:'contain',
        width: 260,
        height: 260,
        transform: [
            { scaleX: -1 }
        ],
        top: 5,
        alignSelf: 'flex-end',
        zIndex: 1
    }
})

export default RideScreen;