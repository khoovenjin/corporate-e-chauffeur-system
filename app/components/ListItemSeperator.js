import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../config/colors';

function ListItemSeperator({ style }) {
    return (
        <View style={styles.container}>
            <View style={[styles.seperator, style]}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    seperator: {
        width: "100%",
        height: 1,
        backgroundColor: colors.light
    }
})

export default ListItemSeperator;