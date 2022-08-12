import React, { useRef, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import * as Yup from "yup";

import HeaderItem from '../../../components/HeaderItem';
import Icon from '../../../components/Icon';
import defaultStyles from '../../../config/styles';
import Screen from '../../../components/Screen';
import AppText from '../../../components/AppText';
import routes from '../../../navigation/routes';
import { passengerList } from '../../../config/data';
import {
    AppForm,
    AppFormImagePicker,
    AppFormField,
    AppFormButton,
    ErrorMessage,
} from "../../../components/form";
import chauffeurApi from '../../../api/chauffeur';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const nameRegExp = /^[A-Za-z ]*$/

const get_file_extension = ( url ) => {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).matches(nameRegExp, 'Please enter a valid name').label("Name"),
    phone: Yup.string().required().matches(phoneRegExp, 'Please enter a valid phone number').min(10).max(10).label("Phone Number"),
    email: Yup.string().required().min(6).email('Please enter a valid email').label("Email"),
    image: Yup.mixed().required("Please enter an Image")
    .test('type', 'Unsupported File Format (jpg, jpeg, png)', (value) => {
        const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png'];
        return value && SUPPORTED_FORMATS.includes(get_file_extension(value));
    })
});

function DriverSettingScreen({ navigation }) {
    const {user} = useAuth();
    const nameInput = useRef();
    const phoneInput = useRef();
    const emailInput = useRef();
    const imageInput = useRef();

    const [resetFailed, setResetFailed] = useState(false);
    
    const successAlert = () => {
        Alert.alert('Personal Information Updated!', 'Your personal information has been updated successfully.',
            [{ text: 'Okay', onPress: ()=>navigation.navigate(routes.DRIVER_ACCOUNT)}]
        )
    }

    const commonError = () => {
        Alert.alert('Error!', 'An unexpected error occured.',
            [{ text: 'Okay'}]
        )
    }

    const handleSubmit = async ({ name, phone, email }, { resetForm }) => {
        const result = await chauffeurApi.getChauffeurByEmail(email);

        if (result.length !== 0) {
            resetForm();
            return setResetFailed(true);
        }

        const updateResult = await chauffeurApi.updateChauffeurSettingProfile(user.userId.toString(),{
            name: name,
            phone: phone,
            email: email
        });

        if(!updateResult.ok){
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
                title="Settings"
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
            <ScrollView>
                <View style={styles.inputContainer}>
                    <AppForm
                        initialValues={{
                            name: '',
                            phone: '',
                            email: '',
                            image: ''
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <AppText style={styles.inputTitle}>Profile Picture:</AppText>
                        <AppFormImagePicker
                            name="image"
                            ref={imageInput}
                        />
                        <View style={styles.textInputContainer}>
                            <AppText style={styles.inputTitle}>Name:</AppText>
                            <AppFormField
                                maxLength={255}
                                name="name"
                                placeholder="Full Name"
                                icon="account-circle"
                                ref={nameInput}
                            />
                        </View>
                        <View style={styles.textInputContainer}>
                            <AppText style={styles.inputTitle}>Phone Number:</AppText>
                            <AppFormField
                                maxLength={100}
                                name="phone"
                                placeholder="Phone Number"
                                icon="phone"
                                ref={phoneInput}
                            />
                        </View>
                        <View style={styles.textInputContainer}>
                            <AppText style={styles.inputTitle}>Email:</AppText>
                            <AppFormField
                                maxLength={100}
                                name="email"
                                placeholder="Email Address"
                                icon="email"
                                ref={emailInput}
                            />
                        </View>
                        <ErrorMessage error="The email has already been taken." visible={resetFailed}/>
                        <AppFormButton title="Save Profile Changes" />
                    </AppForm>
                </View>
            </ScrollView>
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
        marginTop: 10,
    }
})

export default DriverSettingScreen;