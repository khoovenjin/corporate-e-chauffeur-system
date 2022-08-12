import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';

import defaultStyles from '../../config/styles';

function ImageInput({ imageUri, onChangeImage }, ref) {
    const requestPermission = async () => {
        // const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.LOCATION);

        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if(!granted)
            alert("You must enable permission to access the library")
    }

    useEffect(() => {
        requestPermission();
    }, [])

    const handlePress = () => {
        if(!imageUri)
            selectImage();
        else Alert.alert('Delete', 'Are you sure you want to remove this image?',
            [{ text: 'Yes', onPress: ()=>onChangeImage(null)}, { text: 'No' }]
        )
    }

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5
            });
            console.log(result)
            if(!result.cancelled){
                onChangeImage(result.uri);
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container} ref={ref}>
                {!imageUri && <MaterialCommunityIcons name='camera' color={defaultStyles.colors.medium} size={40}/>}
                {imageUri && <Image source={{ uri: imageUri }} style={styles.image}/>}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: defaultStyles.colors.light,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10
    },
    image: {
        height: '100%',
        width: '100%'
    }
})

export default React.forwardRef(ImageInput);