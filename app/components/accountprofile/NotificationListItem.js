import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import defaultStyles from '../../config/styles.js';
import AppText from '../AppText.js';
import Icon from '../Icon.js';

function NotificationListItem({
    title,
    subTitle,
    icon,
    size = 40,
    backgroundColor = defaultStyles.colors.primary,
    color = defaultStyles.colors.white,
    onPress,
    date,
    lining
}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.container, lining]}>
                <View style={styles.notificationContainer}>
                    <Icon name={icon} size={size} backgroundColor={backgroundColor} color={color}/>
                    <View style={styles.text}>
                        <AppText style={styles.styleTitle}>{title}</AppText>
                        <AppText style={styles.styleSubTitle}>{subTitle}</AppText>
                    </View>
                </View>
                <AppText style={styles.styleDate}>{date}</AppText>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: defaultStyles.colors.primary,
        borderWidth: 1,
        flexDirection: 'row'
    },
    notificationContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        flex: 1,
        marginLeft: 10
    },
    styleTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    styleSubTitle: {
        fontSize: 12,
        color: defaultStyles.colors.medium
    },
    styleDate: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})

export default NotificationListItem;