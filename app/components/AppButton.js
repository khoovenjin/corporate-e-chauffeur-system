import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

import colors from '../config/colors'

function AppButton({title, onPress, color = "primary", textStyle, style}, ref) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.button, style, {backgroundColor: colors[color]}]} ref={ref}>
                <Text style={[styles.text, textStyle]}>
                    {title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: "100%",
        marginVertical: 10
    },
    text: {
        color: colors.white,
        fontSize: 14,
        textTransform: "uppercase",
        fontWeight: "bold"
    }
})

export default React.forwardRef(AppButton);