import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';

import CompletedDriverIndicator from '../activityIndicator/CompletedDriverIndicator';
import AppText from '../AppText';
import defaultStyles from '../../config/styles';

function CompletedAnimation({ visible = false, onDone }) {
    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                <AppText style={styles.textTitle}>Yohoo!</AppText>
                <AppText style={styles.text}>Your Ride is Completed!</AppText>
                <View style={styles.subContainer}>
                    <CompletedDriverIndicator visible={visible} onDone={onDone} style={styles.animation}/>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subContainer: {
        marginTop: 10
    },
    textTitle: {
        fontWeight: 'bold',
        color: defaultStyles.colors.primary,
        fontSize: 22,
        marginBottom: 5
    },
    text: {
        fontWeight: 'bold',
        color: defaultStyles.colors.primary,
        fontSize: 28,
    },
    animation: {
        width: 150
    }
})

export default CompletedAnimation;