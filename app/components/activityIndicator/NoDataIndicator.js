import React from 'react';
import LottieView from 'lottie-react-native';

function NoDataIndicator({ visible=false, style }) {
    if(!visible) return null;

    return (
        <LottieView 
            autoPlay
            loop
            source={require('../../animations/no_data.json')}
            style={style}
        />
    );
}

export default NoDataIndicator;