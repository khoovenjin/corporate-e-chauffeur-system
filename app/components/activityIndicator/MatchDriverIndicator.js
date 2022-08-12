import React from 'react';
import LottieView from 'lottie-react-native';

function MatchDriverIndicator({ visible=false, onDone, style }) {
    if(!visible) return null;

    return (
        <LottieView 
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require('../../animations/match_driver.json')}
            style={style}
        />
    );
}

export default MatchDriverIndicator;