import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import AppText from '../AppText';
import defaultStyles from '../../config/styles';

function RideMinutesIndicator({ children, handleComplete }) {
    return (
        <TouchableWithoutFeedback onPress={handleComplete}>
            <View style={styles.container}>
            <AppText style={styles.text}>Estimated Arrival Time: {children} Minutes...</AppText>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.primary,
        height: 40,
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 5,
        borderRadius: 10
    },
    text: {
        color: defaultStyles.colors.white,
        fontSize: 14,
        fontWeight: 'bold'
    }
})

export default RideMinutesIndicator;