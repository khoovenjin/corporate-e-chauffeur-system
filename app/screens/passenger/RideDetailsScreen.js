import React, {useEffect} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import defaultStyles from '../../config/styles.js';
import Screen from '../../components/Screen';
import Icon from '../../components/Icon';
import AutoSearchBar from '../../components/AutoSearchBar';
import SearchBar from '../../components/SearchBar.js';
import routes from '../../navigation/routes.js';
import { recentPlaces } from '../../config/data.js';

function RideDetailsScreen({ navigation, route }) {
    const gpsLocation = route.params;

    const savedPlaces = recentPlaces.map((elem)=>{
        return({
            description: elem.address,
            geometry: { location: { lat: elem.latitude, lng: elem.longitude} },
            structured_formatting: {
                main_text: "Recent Places",
                secondary_text: elem.address
            }
        })
    });

    return (
        <Screen>
            <View style={styles.searchBarContainer}>
                <View style={styles.upperContainer}>
                    <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                        <View style={styles.icon}>
                            <Icon
                                name="chevron-left"
                                backgroundColor={defaultStyles.colors.white}
                                iconColor={defaultStyles.colors.primary}
                                size={65}
                                viewSize={30}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <SearchBar
                        materialIcon="record-circle"
                        iconColor={defaultStyles.colors.lightblue}
                        style={defaultStyles.searchBarContainer}
                        onPress={() => navigation.navigate(routes.RIDE_PICK_UP, gpsLocation)}
                        subContainerStyle={{flex: 1}}
                    > 
                        {gpsLocation.address}
                    </SearchBar>
                </View>
                <AutoSearchBar
                    savedPlaces={savedPlaces}
                    onPress={(parameter)=>{
                        navigation.navigate({
                            name: routes.RIDE_BOOKING,
                            params: {origin: gpsLocation, destination: parameter},
                            merge: true
                        })
                    }}
                    placeholder="Where to?"
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    searchBarContainer: {
        backgroundColor: defaultStyles.colors.white,
        width: '100%',
        padding: 20,
        flex: 1
    },
    upperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: defaultStyles.colors.white,
        marginBottom: 5
    },
    icon: {
        marginRight: 10
    }
})

export default RideDetailsScreen;