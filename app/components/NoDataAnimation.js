import React from 'react';
import { View, StyleSheet } from 'react-native';

import NoDataIndicator from './activityIndicator/NoDataIndicator';
import AppText from './AppText';
import defaultStyles from '../config/styles';

function NoDataAnimation({ visible = false, style }) {
    return (
        <View style={styles.container}>
            <AppText style={styles.text}>No Data Found</AppText>
            <NoDataIndicator visible={visible} style={[styles.animation, style]}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        color: defaultStyles.colors.primary,
        fontSize: 26
    },
    animation: {
        width: '100%'
    }
})

export default NoDataAnimation;