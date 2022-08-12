import React from 'react';
import { View, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"

import defaultStyles from '../config/styles.js'

function AppTextInput({ icon, handleShow, handleMax, width = '100%', ...otherProps }, ref) {
    return (
        <View style={[styles.container, { width }]}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon}/>}
            <TextInput
                placeholderTextColor={defaultStyles.colors.medium}
                style={[defaultStyles.text, styles.text]}
                ref={ref}
                {...otherProps} />
            {handleShow && 
                <TouchableWithoutFeedback onPress={handleShow}>
                    <MaterialCommunityIcons name='eye' size={20} color={defaultStyles.colors.medium} style={styles.icon}/>
                </TouchableWithoutFeedback>
            }
            {handleMax &&
                <TouchableWithoutFeedback onPress={handleMax}>
                    <MaterialCommunityIcons name='cash-check' size={20} color={defaultStyles.colors.medium} style={styles.icon}/>
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

export default React.forwardRef(AppTextInput);