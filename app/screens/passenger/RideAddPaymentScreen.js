import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as Yup from "yup";

import HeaderItem from '../../components/HeaderItem';
import Icon from '../../components/Icon';
import defaultStyles from '../../config/styles.js'
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import routes from '../../navigation/routes';
// import { paymentOptions, openPaymentList } from '../../config/data';
import {
    AppForm,
    AppFormField,
    AppFormButton,
    AppFormPinCode,
    ErrorMessage
} from "../../components/form";
import useAuth from '../../auth/useAuth';
import passengerApi from '../../api/passenger';
import openOTPApi from '../../api/openOTP';
import corporateApi from '../../api/corporate';

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(1).label("Corporate Name"),
    pinCode: Yup.string().required().min(6).label("Corporate Pin Code")
});

function RideAddPaymentScreen({ navigation, route }) {
    const {user} = useAuth();
    const gpsLocation = route.params;

    const pinInput = useRef();
    const textInput = useRef();
    const [connectionFailed, setConnectionFailed] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [connectionDetails, setConnectionDetails] = useState({});

    const commonError = () => {
        Alert.alert('Error!', 'An unexpected error occured.',
            [{ text: 'Okay'}]
        )
    }

    const getUserInfo = async () => {
        const getResult = await passengerApi.getPassengerById(user.userId.toString());

        if(!getResult.ok){
            commonError();
            return;
        }

        setUserInfo(getResult.data);
    }

    useEffect(()=>{
        getUserInfo();
    },[])

    const validateCode = async ( pinCode ) => {
        let result = await openOTPApi.getOpenOTPByPincode(pinCode);
        
        // console.log(result)

        if(!result.ok){
            commonError();
            console.log('get openotp pincode failed')
            return;
        }

        if(result.length === 0){
            return {};
        }
        
        result = result.data[0];
        const deleteResult = await openOTPApi.deleteOpenOTP(result._id);

        if(!deleteResult.ok){
            commonError();
            console.log('delete openotp failed')
            return;
        }

        // const result = openPaymentList.filter((item) => pinCode === item.pinCode && name === item.description)[0];
        // if(!result){
        //     return {};
        // }
        // const auxPaymentList = openPaymentList.filter((item) => !(pinCode === item.pinCode && name === item.description));
        // while(openPaymentList.length > 0) openPaymentList.pop();
        // while(auxPaymentList.length > 0) openPaymentList.push(auxPaymentList.shift());
        const passengerUpdateConnectionresult = await passengerApi.updatePassengerAddConnection(user.userId, {
            corporate_Id: result.corporate_Id,
            name: result.name,
            pincode: result.pincode
        });

        if(!passengerUpdateConnectionresult.ok){
            commonError();
            console.log('add to passenger failed')
            return;
        }

        console.log(result);
        const corporateDeleteOTPResult = await corporateApi.updateCorporateDeleteOpenOTP(result.corporate_Id, {
            name: result.name,
            pincode: result.pincode
        });

        if(!corporateDeleteOTPResult.ok){
            commonError();
            console.log('update corporate failed')
            return;
        }

        const corporateAddConResult = await corporateApi.updateCorporateAddPassengerConnection(result.corporate_Id, {
            passenger_Id: user.userId,
            name: user.name,
            phone: userInfo.phone,
            email: user.email
        });

        if(!corporateAddConResult.ok){
            commonError();
            console.log('update corporate add passenger failed')
            return;
        }

        // const length = paymentOptions.length;
        // const newID = length+1;
        // let newConnection = {...elem, id: newID};
        // paymentOptions.push(newConnection);
        // return newID;
    }

    const handleSubmit = async ({ pinCode, name }, { resetForm }) => {

        const result = await validateCode(pinCode);
        
        if (result === {}) {
            pinInput.current.shake();
            resetForm();
            return setConnectionFailed(true);
        }

        setConnectionFailed(false);
        resetForm();
        const index = userInfo.corp_con.length;
        console.log('index', index)
        navigation.navigate({
            name: routes.RIDE_BOOKING,
            params: {
                ...gpsLocation,
                paymentSelection: index
            },
            merge: true
        })
    }

    const handleFulfill = () => {
        textInput.current.focus();
    }

    return (
        <Screen>
            <HeaderItem
                title="Go Back"
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
                <AppText style={styles.text}>Corporate Payment Connection</AppText>
            </View>
            <View style={styles.inputContainer}>
                <AppForm
                    initialValues={{
                        name: "",
                        pinCode: ""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage error="Invalid Pin Code and/or Corporate Name" visible={connectionFailed}/>
                    <AppText style={styles.inputTitle}>Corporate Pin Code:</AppText>
                    <AppFormPinCode 
                        name="pinCode"
                        ref={pinInput}
                        codeLength={6}
                        cellSpacing={6}
                        handleFulfill={handleFulfill}
                    />
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>Corporate Name:</AppText>
                        <AppFormField
                            maxLength={255}
                            name="name"
                            placeholder="Corporate Name"
                            icon="account-group"
                            ref={textInput}
                        />
                    </View>
                    <AppFormButton title="Link to Account" />
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
        borderRadius: 5,
        borderWidth: 2,
        borderColor: defaultStyles.colors.primary
    },
    textInputContainer: {
        marginTop: 25,
        marginBottom: 5
    }
})

export default RideAddPaymentScreen;