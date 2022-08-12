import React from 'react';
import { View, StyleSheet } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

function PinCodeInput({ name, inputCode, setInputCode, codeLength, cellSpacing, handleFulfill, ...otherProps }, ref) {

    return (
        <View style={styles.container}>
            <View style={styles.pincode}>
                <SmoothPinCodeInput
                    codeLength={codeLength}
                    cellSpacing={cellSpacing}
                    ref={ref}
                    {...otherProps}
                    value={inputCode}
                    onTextChange={(newCode)=>setInputCode(newCode)}
                    onFulfill={handleFulfill}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
    pincode: {
        marginVertical: 10
    }
})

export default React.forwardRef(PinCodeInput);