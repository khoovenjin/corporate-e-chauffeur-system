import React from 'react';
import { View, StyleSheet } from 'react-native';

import defaultStyles from '../../config/styles';
import AppText from '../AppText';

function RideDetailsItem({ title, subTitle, detailsStyle, titleStyle, subStyle }) {
    return (
        <View style={styles.container}>
            <AppText style={[styles.details, detailsStyle]}>Ride Details</AppText>
            <View style={styles.titleContainer}>
                <AppText style={[styles.title, titleStyle]}>{title}</AppText>
            </View>
            <View style={styles.subTitleContainer}>
                <AppText style={[styles.subTitle, subStyle]}>{subTitle}</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10
    },
    titleContainer: {
        marginTop: 7,
    },
    subTitleContainer: {
        marginBottom: 20
    },
    details: {
        fontSize: 17,
        color: defaultStyles.colors.dark,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 37,
        color: defaultStyles.colors.black,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 18,
        color: defaultStyles.colors.medium,
        fontWeight: 'bold',
        opacity: 0.8
    }
})

export default RideDetailsItem; 