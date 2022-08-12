import React, { useRef, useState } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import * as Yup from "yup";

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import defaultStyles from '../config/styles';
// import { passengerList } from '../config/data';
import {
    AppForm,
    AppFormField,
    AppFormButton,
    ErrorMessage
} from "../components/form";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import passengerApi from '../api/passenger';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const nameRegExp = /^[A-Za-z ]*$/

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).matches(nameRegExp, 'Please enter a valid name').label("Name"),
    phone: Yup.string().required().matches(phoneRegExp, 'Please enter a valid phone number').min(10).max(10).label("Phone Number"),
    email: Yup.string().required().min(6).email('Please enter a valid email').label("Email"),
    password: Yup.string().required().min(10).label("Password")
});

function RegisterScreen({ navigation }) {
    const nameInput = useRef();
    const phoneInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();

    const [showPassword, setShowPassword] = useState(true);
    const [loginError, setLoginError] = useState(false);

    const successAlert = () => {
        Alert.alert('Register Successful!', 'Your passenger account has been registered successfully.',
            [{ text: 'Okay'}]
        )
    }
    
    const commonError = () => {
        Alert.alert('Error!', 'An unexpected error occured.',
            [{ text: 'Okay'}]
        )
    }

    const handleSubmit = async ({ name, phone, email, password }, { resetForm }) => {
        const result = await passengerApi.getPassengerByEmail(email);

        if (result.data.length !== 0) {
            resetForm();
            return setLoginError(true);
        }

        const registerResult = await passengerApi.addPassenger({
            name: name,
            phone: phone,
            email: email,
            password: password
        })

        if(!registerResult.ok){
            resetForm();
            commonError();
            return;
        }

        setLoginError(false);
        resetForm();
        successAlert();
    }

    return (
        <Screen>
            <Image
                style={styles.image}
                source={require('../assets/background.png')}
            />
            <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                <View style={{position: 'absolute', top: 15}}>
                    <MaterialCommunityIcons name="chevron-left" size={45} color={defaultStyles.colors.white}/>
                </View>
            </TouchableWithoutFeedback>
            <AppText style={styles.title}>Form Registry</AppText>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <AppForm
                        initialValues={{
                            name: "",
                            phone: "",
                            email: "",
                            password: ""
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <ErrorMessage error="The email has already been taken." visible={loginError}/>
                        <AppFormField
                            maxLength={255}
                            name="name"
                            placeholder="Name"
                            icon="account"
                            ref={nameInput}
                        />
                        <AppFormField
                            maxLength={255}
                            name="phone"
                            placeholder="Phone Number"
                            icon="phone"
                            ref={emailInput}
                        />
                        <AppFormField
                            maxLength={255}
                            name="email"
                            placeholder="Email"
                            icon="email"
                            ref={phoneInput}
                        />
                        <View style={styles.textInputContainer}>
                            <AppFormField
                                maxLength={255}
                                name="password"
                                placeholder="Password"
                                icon="lock"
                                ref={passwordInput}
                                secureTextEntry={showPassword}
                                handleShow={()=>setShowPassword(!showPassword)}
                            />
                        </View>
                        <AppFormButton title="Create Account" />
                    </AppForm>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        bottom: 0,
    },
    dropdownContainer: {
        width: '80%',
        marginBottom: 100
    },
    dropdownStyle: {
        borderColor: defaultStyles.colors.light,
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 20,
        paddingLeft: 20
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: defaultStyles.colors.white,
        position: 'absolute',
        alignSelf: 'center',
        top: 70
    },
    inputContainer: {
        width: '80%',
        marginBottom: 28,
        paddingTop: 20,
        zIndex: 0
    },
    textInputContainer: {
        marginBottom: 5
    },
    register: {
        fontSize: 14,
        alignSelf: 'center',
        color: defaultStyles.colors.primary,
        marginTop: 10
    }
})

export default RegisterScreen;