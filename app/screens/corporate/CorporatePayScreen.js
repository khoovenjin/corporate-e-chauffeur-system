import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import * as Yup from "yup";

import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import CorporateOutstandingPieChart from '../../components/analysis/CorporateOutstandingPieChart';
import GradientHeader from '../../components/GradientHeader';
import defaultStyles from '../../config/styles';
import {
    AppForm,
    AppFormField,
    AppFormButton,
    ErrorMessage
} from "../../components/form";
import { sampleOverallTransaction, sampleRide } from '../../config/data';
import ListItemSeperator from '../../components/ListItemSeperator';
import corporateApi from '../../api/corporate';
import useAuth from '../../auth/useAuth';

const validationSchema = Yup.object().shape({
    outstanding: Yup.number().required().min(1).max(10000).label("Payment"),
});

function CorporatePayScreen({ navigation }) {
    const {user} = useAuth();
    const outstandingInput = useRef();
    const [paymentFailed, setPaymentFailed] = useState(false);
    const [amount, setAmount] = useState(0);
    
    const successAlert = () => {
        Alert.alert('Payment Successful!', 'Your payment has been transfered successfully.',
            [{ text: 'Okay', onPress: ()=>console.log("Success")}]
        )
    }

    const commonError = () => {
        Alert.alert('Error!', 'An unexpected error occured.',
            [{ text: 'Okay'}]
        )
    }

    const handleSubmit = async ({ outstanding }, { resetForm }) => {
        if (outstanding > amount) {
            resetForm();
            return setPaymentFailed(true);
        }

        const result = await corporateApi.updateCorporateAddPayment(user.userId.toString(),{
            amount: parseFloat(outstanding)
        })

        if(!result.ok){
            commonError();
            return;
        }

        setAmount(amount-outstanding);

        setPaymentFailed(false);
        resetForm();
        successAlert();
    }

    useEffect(()=>{
        let outstandingBalance = 0;

        if(sampleRide.length !== 0){
            const totalSpending = sampleRide.reduce((acc, item) => acc + (item.value || 0), 0);
            if(sampleOverallTransaction.length !== 0){
                const overallPaid = sampleOverallTransaction.reduce((acc, item) => acc + (item.Transaction_Amount || 0), 0);
                outstandingBalance = totalSpending - overallPaid;
            } else outstandingBalance = totalSpending;
        }

        setAmount(parseFloat(outstandingBalance.toFixed(2)));
    }, [sampleOverallTransaction, sampleRide])

    return (
        <Screen>
            <ScrollView>
                <GradientHeader 
                    title="Outstanding Settlement"
                    subUnit="RM"
                    subTitle={amount}
                    onPress={()=>navigation.goBack()}
                />
                <View style={styles.pieChartContainer}>
                    <AppText style={styles.textChart}>Balance Due</AppText>
                    <CorporateOutstandingPieChart />
                </View>
                <ListItemSeperator style={styles.separatorLining}/>
                <View style={styles.container}>
                    <AppText style={styles.text}>Settle Payment</AppText>
                    <AppText style={styles.balanceTitle}>{`Outstanding Balance: \$${amount}`}</AppText>
                </View>
                <View style={styles.inputContainer}>
                    <AppForm
                        initialValues={{
                            outstanding:""
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <ErrorMessage error={`Amount entered exceeds your balance due. Please enter a lower amount than \$${amount.toFixed(2)}.`} visible={paymentFailed}/>
                        <View style={styles.textInputContainer}>
                            <AppText style={styles.inputTitle}>Amount:</AppText>
                            <AppFormField
                                keyboardType="numeric"
                                maxLength={8}
                                name="outstanding"
                                placeholder="Outstanding"
                                icon="cash"
                                ref={outstandingInput}
                                handleMax={amount.toString()}
                            />
                        </View>
                        <AppFormButton title="Confirm" />
                    </AppForm>
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    pieChartContainer: {
        marginTop: 40,
    },
    container: {
        padding: 20,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 22,
        color: defaultStyles.colors.primary,
    },
    textChart: {
        fontWeight: 'bold',
        color: defaultStyles.colors.primary,
        fontSize: 22,
        alignSelf: 'center'
    },
    balanceTitle: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 15,
        color: defaultStyles.colors.secondary
    },
    inputTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    inputContainer: {
        marginHorizontal: 10,
        marginBottom: 40,
        padding: 10,
        paddingTop: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: defaultStyles.colors.primary
    },
    textInputContainer: {
        marginBottom: 5
    },
    separatorLining: {
        padding: 3,
        backgroundColor: defaultStyles.colors.light
    }
})

export default CorporatePayScreen;