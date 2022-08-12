import React from 'react';
import LottieView from 'lottie-react-native';

function CompletedDriverIndicator({ visible=false, onDone, style }) {
    if(!visible) return null;

    return (
        <LottieView 
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require('../../animations/completed_driver.json')}
            style={style}
        />
    );
}

export default CompletedDriverIndicator;