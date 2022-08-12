import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import Screen from '../../components/Screen.js';
import defaultStyles from '../../config/styles.js';
import AutoSearchBar from '../../components/AutoSearchBar';
import AppText from '../../components/AppText.js';
import Icon from '../../components/Icon.js';
import routes from '../../navigation/routes.js';

function RidePickUpScreen({ navigation, route }) {
    const gpsLocation = route.params;
    const savedPlaces = [{
        description: gpsLocation.address,
        geometry: { location: { lat: gpsLocation.latitude, lng: gpsLocation.longitude} },
        structured_formatting: {
            main_text: "Current Location",
            secondary_text: gpsLocation.address
        }
    }];

    return (
        <Screen>
            <View style={styles.searchBarContainer}>
                <View style={styles.upperContainer}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View style={styles.buttonContainer}>
                            <View style={styles.icon}>
                                <Icon
                                    name="chevron-left"
                                    backgroundColor={defaultStyles.colors.white}
                                    iconColor={defaultStyles.colors.primary}
                                    size={65}
                                    viewSize={30}
                                />
                            </View>
                            <AppText style={{fontWeight: 'bold', color: defaultStyles.colors.primary}}>
                                Go Back
                            </AppText>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <AutoSearchBar
                    savedPlaces={savedPlaces}
                    onPress={(parameter)=>{
                        navigation.navigate({ name: routes.RIDE_DETAILS, params: parameter, merge: true})
                    }} 
                    placeholder="Current Location"
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
        marginBottom: 5,
        flexDirection: 'row'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginRight: 10
    }
})

export default RidePickUpScreen;