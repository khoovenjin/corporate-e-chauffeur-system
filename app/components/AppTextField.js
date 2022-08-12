import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"

import defaultStyles from '../config/styles.js'
import AppText from './AppText.js';

function AppTextField({ icon, handleShow, textStyle, containerStyle, value, width = '100%', ...otherProps }) {
    return (
        <View style={[styles.container, { width }, containerStyle]}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon}/>}
            <AppText
                style={[defaultStyles.text, styles.text, textStyle]}
                {...otherProps}
            >
                {value}
            </AppText>
            {handleShow && 
                <TouchableWithoutFeedback onPress={handleShow}>
                    <MaterialCommunityIcons name='eye' size={20} color={defaultStyles.colors.medium} style={styles.icon}/>
                </TouchableWithoutFeedback>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 20,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        alignItems: 'center'
    },
    icon: {
        marginRight: 10
    },
    text: {
        fontSize: 16,
        flex: 1
    }
})

export default AppTextField;