import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import RideMinutesIndicator from './RideMinutesIndicator';
import RideDetailsItem from './RideDetailsItem';
import ListItemSeperator from '../ListItemSeperator';
import DriverProfileItem from './DriverProfileItem';

function AppBottomField({ rideMinutes, handleComplete, rideTitle, rideSubTitle, driverTitle, image }) {
    return (
        <View style={styles.container}>
            <RideMinutesIndicator handleComplete={handleComplete}>{rideMinutes}</RideMinutesIndicator>
            <RideDetailsItem
                title={rideTitle}
                subTitle={rideSubTitle}
            />
            <ListItemSeperator style={styles.detailsLining}/>
            <DriverProfileItem title={driverTitle} image={image}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginBottom: 10
    },
    detailsLining: {
        height: 2,
    },
})

export default AppBottomField;