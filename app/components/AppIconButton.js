import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import defaultStyles from '../config/styles';

function AppIconButton({
    title,
    icon,
    size = 20,
    color = defaultStyles.colors.primary,
    onPress,
    style
}) 
{
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.container, style]}>
                <MaterialCommunityIcons name={icon} size={size} color={color} />
                <AppText style={styles.title}>{title}</AppText>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        backgroundColor: defaultStyles.colors.white,
        shadowColor: defaultStyles.colors.black,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3
    },
    title: {
        marginLeft: 10,
        fontSize: 16,
        color: defaultStyles.colors.black,
        fontWeight: 'bold'
    }
})

export default AppIconButton;