import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../../config/styles'
import AppText from '../AppText';

function ProfileHeaderItem({ image, title }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {image && <Image style={styles.image} source={image}/>}
                {!image && 
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name='account' color={defaultStyles.colors.medium} size={60}/>
                    </View>
                }
            </View>
            <AppText style={styles.text}>{title}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: defaultStyles.colors.lightblue,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultStyles.colors.light,
        overflow: 'hidden',
    },
    container: {
        width: '100%',
        height: '35%',
        backgroundColor: defaultStyles.colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: defaultStyles.colors.lightblue
    },
    imageContainer: {
        marginBottom: 15
    },
    text: {
        fontWeight: 'bold',
        fontSize: 22,
        color: defaultStyles.colors.white
    }
})

export default ProfileHeaderItem;