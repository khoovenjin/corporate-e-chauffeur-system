import React from 'react';
import { View, StyleSheet } from 'react-native';

import SearchDriverIndicator from '../activityIndicator/SearchDriverIndicator';
import AppText from '../AppText';
import defaultStyles from '../../config/styles';

function AppIndicatorSheet({ visible = false }) {
    return (
        <View style={styles.container}>
            <AppText style={styles.text}>Searching Chauffeurs...</AppText>
            <SearchDriverIndicator visible={visible} style={styles.animation}/>
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
        fontSize: 26,
        marginBottom: 40
    },
    animation: {
        width: '100%'
    }
})

export default AppIndicatorSheet;