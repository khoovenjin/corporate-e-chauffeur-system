import React from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import defaultStyles from '../config/styles';

function GradientHeader({ title, subUnit, subTitle, onPress }) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/gradient-background.jpg')}
            />
            <View style={styles.detailsContainer}>
                <TouchableWithoutFeedback onPress={onPress}>
                    <MaterialCommunityIcons
                        name="chevron-left"
                        color={defaultStyles.colors.primary}
                        size={35}
                    />
                </TouchableWithoutFeedback>
                <View style={styles.textContainer}>
                    <AppText style={styles.title}>{title}</AppText>
                    <View style={styles.subTitleContainer}>
                        <View>
                            <AppText style={styles.subUnit}>{subUnit}</AppText>
                        </View>
                        <AppText style={styles.subTitle}>{subTitle}</AppText>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        backgroundColor: defaultStyles.colors.white,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    detailsContainer: {
        position: 'absolute',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: defaultStyles.colors.primary,
        marginBottom: 5,
    },
    subTitleContainer: {
        flexDirection: 'row',
    },
    subUnit: {
        fontSize: 13,
        color: defaultStyles.colors.medium,
        marginRight: 8,
        top: 6
    },
    subTitle: {
        fontSize: 30,
        color: defaultStyles.colors.black,
        fontWeight: 'bold'
    },
    textContainer: {
        marginTop: 5,
        left: 10
    }
})

export default GradientHeader;