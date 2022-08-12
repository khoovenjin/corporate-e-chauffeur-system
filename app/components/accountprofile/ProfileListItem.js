import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../../config/styles';
import AppText from '../AppText';

function ProfileListItem({ item, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.icon}>
                    <MaterialCommunityIcons
                        name={item.icon}
                        size={20}
                        color={defaultStyles.colors.white}
                    />
                </View>
                <AppText style={styles.text}>{item.title}</AppText>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: defaultStyles.colors.white,
        shadowColor: defaultStyles.colors.black,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        height: 35,
        width: 35,
        backgroundColor: defaultStyles.colors.primary,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },
    text: {
        color: defaultStyles.colors.primary,
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default ProfileListItem;