import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';

import PickerScreen from './PickerScreen.js';

function ButtonPicker({ ButtonComponent, rideOption, handleSelect }) {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        // Can use <React.Fragment> 
        <>
            <TouchableWithoutFeedback onPress={()=>setModalVisible(true)}>
                {ButtonComponent}
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={()=>{setModalVisible(false)}}>
                <PickerScreen
                    rideOption={rideOption}
                    handleSelect={handleSelect}
                    handlePress={()=>setModalVisible(false)}
                />
            </Modal>  
        </>
    );
}

export default ButtonPicker;