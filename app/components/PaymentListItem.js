import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import defaultStyles from '../config/styles.js';
import AppText from './AppText';

function PaymentListItem({
    title,
    subTitle,
    icon,
    size = 20,
    color = defaultStyles.colors.white,
    backgroundColor = defaultStyles.colors.darkgrey,
    onPress,
    subTitleStyle,
    containerStyle
}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.container, containerStyle]}>
                <View style={[styles.iconContainer, {backgroundColor}, {height: size+10, width: size+20}]}>
                    <MaterialCommunityIcons name={icon} size={size} color={color}/>
                </View>
                <View style={styles.text}>
                    {title ?
                        (<AppText style={styles.styleTitle}>{title}</AppText>)
                        :
                        (<AppText style={[styles.styleTitle, subTitleStyle]}>{subTitle}</AppText>)
                    }
                    {title && <AppText style={styles.styleSubTitle}>{subTitle}</AppText>}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10
    },
    styleTitle: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    styleSubTitle: {
        fontSize: 12
    }
})

export default PaymentListItem;