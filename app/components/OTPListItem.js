import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import defaultStyles from '../config/styles.js';
import AppText from './AppText.js';
import AppTextField from './AppTextField.js';
import Icon from './Icon.js';

function OTPListItem({
    title,
    subTitle,
    icon,
    size = 40,
    backgroundColor = defaultStyles.colors.primary,
    color = defaultStyles.colors.white,
    onPress,
    lining,
    handleShow,
    value,
    ...otherProps
}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.container, lining]}>
                <View style={styles.subContainer}>
                    <Icon name={icon} size={size} backgroundColor={backgroundColor} color={color}/>
                    <View style={styles.text}>
                        <AppText style={styles.styleTitle}>{title}</AppText>
                        <AppText style={styles.styleSubTitle}>{subTitle}</AppText>
                        <AppTextField 
                            handleShow={handleShow}
                            value={value}
                            textStyle={{fontSize: 12}}
                            containerStyle={{paddingLeft: 15, padding: 3, marginVertical: 5}}
                            width={120}
                            {...otherProps}
                        />
                    </View>
                </View>
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
    subContainer: {
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
})

export default OTPListItem;