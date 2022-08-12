import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
function Icon({
    name,
    size = 40,
    backgroundColor = "#000",
    iconColor = "#fff",
    viewSize = size
}) {
    return (
        <View style={{
            width: viewSize,
            height: viewSize,
            borderRadius: viewSize/2,
            backgroundColor,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5}/>
        </View>
    );
}

export default Icon;