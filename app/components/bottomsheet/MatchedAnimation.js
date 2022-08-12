import React from 'react';
import { View, StyleSheet } from 'react-native';

import MatchDriverIndicator from '../activityIndicator/MatchDriverIndicator';
import AppText from '../AppText';
import defaultStyles from '../../config/styles';

function MatchedAnimation({ visible = false, onDone }) {
    return (
        <View style={styles.container}>
            <AppText style={styles.textTitle}>We've found</AppText>
            <AppText style={styles.text}>You a Chauffeur!</AppText>
            <MatchDriverIndicator visible={visible} onDone={onDone} style={styles.animation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
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
        fontSize: 30,
        marginBottom: 20
    },
    animation: {
        width: '100%'
    }
})

export default MatchedAnimation;