import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get("window");

import defaultStyles from '../config/styles.js'

function ScreenHeader({ children }) {
    return (
        <View style={styles.container}>
            <View style={styles.subtitle}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 185,
        backgroundColor: defaultStyles.colors.primary,
        justifyContent: 'center'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: defaultStyles.colors.white
    },
    subtitle: {
        
    }
})

export default ScreenHeader;