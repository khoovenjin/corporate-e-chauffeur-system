import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import defaultStyles from '../config/styles.js';
import AppText from './AppText';

function HeaderItem({ title, subTitle, IconComponent, titleStyle, styleObject, styleContainer, styleDetailContainer, onPress }) {
    return (
        <View style={[styles.container, styleObject]}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[styles.subContainer, styleContainer]}>
                    {IconComponent}
                    <View style={[styles.subContainerDetails, styleDetailContainer]}>
                        {styleObject ? (<AppText style={[styles.title, defaultStyles.alternateTitle, titleStyle]} numberofLines={1}>{title}</AppText>)
                        : (<AppText style={styles.title} numberofLines={1}>{title}</AppText>)}
                        {subTitle && <AppText style={styles.subTitle} numberofLines={2}>{subTitle}</AppText>}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.primary,
        height: 185,
        justifyContent: 'center',
        padding: 10,
        width: "100%"
    },
    subContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    subContainerDetails: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
    },
    subTitle: {
        color: defaultStyles.colors.light,
        fontSize: 14
    },
    title: {
        color: defaultStyles.colors.white,
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default HeaderItem;