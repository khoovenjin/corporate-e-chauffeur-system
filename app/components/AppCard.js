import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import defaultStyles from '../config/styles';

function AppCard({title, subUnit, subTitle, detailsTitle, onPress}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <Image
                        style={styles.image}
                        source={require('../assets/gradient-background.jpg')}
                    />
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
                <View style={styles.detailsContainer}>
                    <AppText style={styles.detailsTitle}>{detailsTitle}</AppText>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={30}
                        color={defaultStyles.colors.medium}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 5,
        height: 200,
        borderRadius: 10,
        backgroundColor: defaultStyles.colors.white,
        shadowColor: defaultStyles.colors.black,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        overflow: 'hidden'
    },
    upperContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
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
    detailsContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: defaultStyles.colors.light,
        paddingHorizontal: 20,
        paddingVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailsTitle: {
        fontSize: 14,
        color: defaultStyles.colors.medium
    },
    image: {
        width: '100%',
        height: '100%'
    },
    textContainer: {
        position: 'absolute',
        paddingHorizontal: 20,
        paddingVertical: 15
    }
})

export default AppCard;