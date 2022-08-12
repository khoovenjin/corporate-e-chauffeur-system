import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import HeaderItem from '../../components/HeaderItem';
import Icon from '../../components/Icon';
import AppText from '../../components/AppText';
import AppTextField from '../../components/AppTextField';
import defaultStyles from '../../config/styles';
import Screen from '../../components/Screen';
import AppButton from '../../components/AppButton';
import corporateApi from '../../api/corporate';
import openOTPApi from '../../api/openOTP';

const generateRandomString = () => {
    const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    const random = Array.from(
        {length: 6},
        () => char[Math.floor(Math.random() * char.length)]
    );
    const randomString = random.join("");
    return randomString;
}

function CorporateOpenOTPScreen({ navigation }) {
    const {user} = useAuth();
    const [name, setName] = useState('');
    const [pincode, setPinCode] = useState('');
    const [trigger, setTrigger] = useState(false);

    const successAlert = () => {
        Alert.alert('Creation Successful!', 'Your OTP has been created successfully.',
            [{ text: 'Okay'}]
        )
    }

    const copyAlert = () => {
        Alert.alert('Copy Successful!', 'The corporate OTP details have been copied to your clipboard successfully.',
            [{ text: 'Okay' }]
        )
    }

    const commonError = () => {
        Alert.alert('Error!', 'An unexpected error occured.',
            [{ text: 'Okay'}]
        )
    }

    const toggleTrigger = () => {
        setTrigger(previousState => !previousState)
    };

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(`Corporate Name: ${name}\nCorporate Pin Code: ${pincode}`);
        copyAlert();
    };

    useEffect(()=> {
        console.log('Activated')
        setPinCode(generateRandomString());
        setName(user.name);
    },[trigger])

    const addOTP = async () =>{
        const result = await corporateApi.updateCorporateAddOpenOTP(user.userId.toString(), {
            name: user.name,
            pincode: pincode
        });

        if(!result.ok){
            commonError();
            return;
        }

        const otpresult = openOTPApi.addOpenOTP(user.userId.toString(), {
            name: user.name,
            pincode: pincode
        });

        // if(!otpresult.ok){
        //     commonError();
        //     return;
        // }
    }

    return (
        <Screen>
            <HeaderItem
                title="One-time Password"
                IconComponent={
                    <Icon
                        name="keyboard-backspace"
                        backgroundColor={defaultStyles.colors.primary}
                        iconColor={defaultStyles.colors.white}
                    />
                }
                styleObject={defaultStyles.headerStyle}
                onPress={()=>navigation.goBack()}
            />
            <View style={styles.container}>
                <AppText style={styles.text}>Set-up One-time Password</AppText>
            </View>
            <View style={styles.inputContainer}>
                <AppText style={styles.title}>Corporate Name:</AppText>
                <AppTextField
                    icon="account-group"
                    value={name}
                />
                <AppText style={styles.title}>Corporate Pin Code:</AppText>
                <AppTextField
                    icon="onepassword"
                    value={pincode}
                />
                <AppButton
                    title="Copy to Clipboard!"
                    onPress={copyToClipboard}
                    style={styles.copyButton}
                    color="primary"
                />
                <View style={styles.buttonContainer}>
                    <AppButton
                        title="Re-Generate"
                        onPress={toggleTrigger}
                        style={styles.generateButton}
                        color="primary"
                    />
                    <AppButton
                        title="Create"
                        onPress={()=>{
                            addOTP();
                            successAlert();
                        }}
                        style={styles.createButton}
                        color="primary"
                    />
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    text: {
        fontWeight: 'bold',
        fontSize: 22,
        color: defaultStyles.colors.primary
    },
    inputContainer: {
        marginHorizontal: 10,
        padding: 10,
        paddingTop: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: defaultStyles.colors.primary
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    copyButton: {
        width: '100%',
        borderRadius: 30,
        padding: 8
    },
    generateButton: {
        width: '47%',
        borderRadius: 30,
        padding: 8
    },
    createButton: {
        width: '47%',
        borderRadius: 30,
        padding: 8
    }
})

export default CorporateOpenOTPScreen;