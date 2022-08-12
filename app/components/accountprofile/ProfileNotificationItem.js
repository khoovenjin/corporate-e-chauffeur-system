import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../../config/styles';
import AppText from '../AppText';

function ProfileNotificationItem({ item, status, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <View style={styles.icon}>
                        <MaterialCommunityIcons
                            name={item.icon}
                            size={20}
                            color={defaultStyles.colors.white}
                        />
                    </View>
                    <AppText style={styles.text}>{item.title}</AppText>
                </View>
                <AppText style={styles.status}>{status}</AppText>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 170,
        marginHorizontal: 10,
        marginBottom: 5,
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
        justifyContent: 'center',
    },
    subContainer: {
        flexDirection: 'row',
        marginBottom: 5
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
        fontSize: 20
    },
    status: {
        fontSize: 15,
        color: defaultStyles.colors.medium,
        opacity: 0.8
    }
})

export default ProfileNotificationItem;