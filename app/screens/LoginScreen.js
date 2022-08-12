import React, { useRef, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Yup from "yup";

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import defaultStyles from '../config/styles';
import {
    AppForm,
    AppFormField,
    AppFormButton,
    ErrorMessage
} from "../components/form";
import AppButton from '../components/AppButton';
import routes from '../navigation/routes';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().min(6).email('Please enter a valid email').label("Email"),
    password: Yup.string().required().min(10).label("Password")
});

function LoginScreen({ navigation }) {
    const auth = useAuth();
    const emailInput = useRef();
    const passwordInput = useRef();

    const [showPassword, setShowPassword] = useState(true);
    const [loginError, setLoginError] = useState(false);

    // Dropdown Picker
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('passenger');
    const [items, setItems] = useState([
        {label: 'Passenger', value: 'passenger'},
        {label: 'Chauffeur', value: 'chauffeur'},
        {label: 'Corporate', value: 'corporate'}
    ]);

    const handleSubmit = async ({ email, password }, { resetForm }) => {
        const result = await authApi.login(email, password, value);

        if(!result.ok) {
            resetForm();
            return setLoginError(true);
        }
        
        setLoginError(false);
        auth.logIn(result.data);
        resetForm();
    }

    return (
        <Screen>
            <Image
                style={styles.image}
                source={require('../assets/background.png')}
            />
            <AppText style={styles.title}>Chauffeseur</AppText>
            <View style={styles.container}>
                <View style={styles.dropdownContainer}>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Select an Role"
                        style={styles.dropdownStyle}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <AppForm
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <ErrorMessage error="Invalid email or password." visible={loginError}/>
                        <AppFormField
                            maxLength={255}
                            name="email"
                            placeholder="Email"
                            icon="email"
                            ref={emailInput}
                            editable={!open}
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
                                editable={!open}
                            />
                        </View>
                        <AppFormButton title="Login" />
                    </AppForm>
                    <AppText style={styles.register}>Not a member?</AppText>
                    <AppButton
                        title="Register"
                        onPress={()=>{
                            navigation.navigate(routes.REGISTER);
                        }}
                    />
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
        marginBottom: 125
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
        marginBottom: 10,
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

export default LoginScreen;