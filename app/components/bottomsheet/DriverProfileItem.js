import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import defaultStyles from '../../config/styles';
import AppText from '../AppText';

function DriverProfileItem({ title, styleTitle, image }) {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                {image && <Image style={styles.image} source={image} />}
                <View style={styles.detailsContainer}>
                    <AppText style={[styles.title, styleTitle]} numberofLines={1}>{title}</AppText>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.white,
        marginTop: 10
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 20,
        justifyContent: "center"
    },
    subContainer: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: 15
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: defaultStyles.colors.black
    }
})

export default DriverProfileItem;