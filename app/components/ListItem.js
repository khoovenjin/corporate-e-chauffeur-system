import React from 'react';
import { View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import defaultStyles from '../config/styles.js';
import AppText from './AppText';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons'

function ListItem({ title, subTitle, image, IconComponent, onPress, renderRightActions, styleTitle }) {
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableHighlight
                underlayColor={defaultStyles.colors.light}
                onPress={onPress}
            >
                <View style={styles.container}>
                    {IconComponent}
                    {image && <Image style={styles.image} source={image} />}
                    <View style={styles.detailsContainer}>
                        <AppText style={[styles.title, styleTitle]} numberofLines={1}>{title}</AppText>
                        {subTitle && <AppText style={styles.subTitle} numberOfLines={1}>{subTitle}</AppText>}
                    </View>
                    <MaterialCommunityIcons color={defaultStyles.colors.medium} name="chevron-right" size={25} />
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: defaultStyles.colors.white
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center"
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    subTitle: {
        color: defaultStyles.colors.medium,
        fontSize: 12,
    },
    title: {
        fontWeight: "500",
    }
})

export default ListItem;