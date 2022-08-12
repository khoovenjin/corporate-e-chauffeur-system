import React from 'react';
import { View, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles.js';
import AppText from './AppText';
import { Ionicons } from '@expo/vector-icons';

function SearchListItem({ title, subTitle }) {
    return (
        <View style={styles.resultContainer}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name='location-sharp'
                    size={17}
                    color={defaultStyles.colors.white}
                />
            </View>
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{title}</AppText>
                <AppText style={styles.subTitle}>{subTitle}</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: defaultStyles.colors.black
    },
    subTitle: {
        fontSize: 12,
        color: defaultStyles.colors.medium
    },
    iconContainer: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: defaultStyles.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    resultContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailsContainer: {
        flex: 1
    }
})

export default SearchListItem;