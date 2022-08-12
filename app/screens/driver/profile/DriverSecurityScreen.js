import React, { useRef, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as Yup from "yup";

import HeaderItem from '../../../components/HeaderItem';
import Icon from '../../../components/Icon';
import defaultStyles from '../../../config/styles';
import Screen from '../../../components/Screen';
import AppText from '../../../components/AppText';
import routes from '../../../navigation/routes';
import {
    AppForm,
    AppFormField,
    AppFormButton,
    ErrorMessage
} from "../../../components/form";
import chauffeurApi from '../../../api/chauffeur';

const validationSchema = Yup.object().shape({
    password: Yup.string().required().min(10).label("New Password"),
    confirmpassword: Yup.string().required().min(10).label("Confirm Password")
});

function DriverSecurityScreen({ navigation }) {
    const {user} = useAuth();
    const passwordInput = useRef();
    const confirmInput = useRef();

    const [showPassword, setShowPassword] = useState(true);
    const [showConfirm, setShowConfirm] = useState(true);

    const [resetFailed, setResetFailed] = useState(false);
    
    const successAlert = () => {
        Alert.alert('Password Updated!', 'Your password has been changed successfully.',
            [{ text: 'Okay', onPress: ()=>navigation.goBack()}]
        )
    }

    const commonError = () => {
        Alert.alert('Error!', 'An unexpected error occured.',
            [{ text: 'Okay'}]
        )
    }

    const handleSubmit = async ({ password, confirmpassword }, { resetForm }) => {
        
        if (password !== confirmpassword) {
            resetForm();
            return setResetFailed(true);
        }

        const result = await chauffeurApi.updateChauffeurSecurityProfile(user.userId.toString(), {
            password: password
        });

        if(!result.ok) {
            resetForm();
            commonError();
            return;
        }

        setResetFailed(false);
        resetForm();
        successAlert();
    }

    return (
        <Screen>
            <HeaderItem
                title="Security"
                IconComponent={
                    <Icon
                        name="keyboard-backspace"
                        backgroundColor={defaultStyles.colors.primary}
                        iconColor={defaultStyles.colors.white}
                    />
                }
                styleObject={defaultStyles.headerStyle}
                onPress={()=>navigation.navigate(routes.DRIVER_ACCOUNT)}
            />
            <View style={styles.inputContainer}>
                <AppForm
                    initialValues={{
                        password: "",
                        confirmpassword: ""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage error="Please make sure your passwords match." visible={resetFailed}/>
                    <AppText style={styles.inputTitle}>New Password:</AppText>
                    <AppFormField
                        maxLength={255}
                        name="password"
                        placeholder="New Password"
                        icon="lock"
                        ref={passwordInput}
                        secureTextEntry={showPassword}
                        handleShow={()=>setShowPassword(!showPassword)}
                    />
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>Confirm Password:</AppText>
                        <AppFormField
                            maxLength={255}
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            icon="lock"
                            ref={confirmInput}
                            secureTextEntry={showConfirm}
                            handleShow={()=>setShowConfirm(!showConfirm)}
                        />
                    </View>
                    <AppFormButton title="Change Password" />
                </AppForm>
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
    button: {
        marginTop: 15
    },
    inputTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    inputContainer: {
        marginHorizontal: 10,
        padding: 10,
        paddingTop: 20,
        marginTop: 5
    },
    textInputContainer: {
        marginTop: 25,
        marginBottom: 5
    }
})

export default DriverSecurityScreen;