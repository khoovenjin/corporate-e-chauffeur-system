import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles.js'
import AppText from './AppText.js';

function SearchBar({ 
    icon='location-sharp',
    children,
    iconColor=defaultStyles.colors.black,
    backgroundColor=defaultStyles.colors.white,
    size=22,
    style,
    onPress,
    subContainerStyle,
    materialIcon
}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            {subContainerStyle ? (
                <View style={[styles.subContainer, subContainerStyle]}>
                    {materialIcon ?
                        (<MaterialCommunityIcons name={materialIcon} size={size} backgroundColor={backgroundColor} color={iconColor}/>)
                    :
                        (<Ionicons name={icon} size={size} backgroundColor={backgroundColor} color={iconColor}/>)
                    }
                    <AppText style={styles.title} numberOfLines={1}>{children}</AppText>
                </View>
            ) : 
            (<View style={[styles.container, style]}>
                <View style={styles.subContainer}>
                    {materialIcon ?
                        (<MaterialCommunityIcons name={materialIcon} size={size} backgroundColor={backgroundColor} color={iconColor}/>)
                    :
                        (<Ionicons name={icon} size={size} backgroundColor={backgroundColor} color={iconColor}/>)
                    }
                    <AppText style={styles.title} numberOfLines={1}>{children}</AppText>
                </View>
            </View>
            )}
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    subContainer: {
        backgroundColor: defaultStyles.colors.white,
        borderRadius: 8,
        flexDirection: "row",
        padding: 15,
        width: '85%',
        alignItems: 'center',
        shadowColor: defaultStyles.colors.black,
        elevation: 10,
    },
    title: {
        flex: 1,
        color: defaultStyles.colors.medium,
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 17,
    }
})

export default SearchBar;