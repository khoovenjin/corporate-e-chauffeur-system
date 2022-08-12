import React from 'react';
import LottieView from 'lottie-react-native';

function SearchDriverIndicator({ visible=false, style }) {
    if(!visible) return null;

    return (
        <LottieView 
            autoPlay
            loop
            source={require('../../animations/searching_driver.json')}
            style={style}
        />
    );
}

export default SearchDriverIndicator;