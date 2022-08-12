import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Screen from '../Screen';

function AppBottomSheet({ children }) {
    return (
        <GestureHandlerRootView style={styles.rootview}>
          <Screen>{children}</Screen>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    rootview: {
        flex: 1
    }
})

export default AppBottomSheet;