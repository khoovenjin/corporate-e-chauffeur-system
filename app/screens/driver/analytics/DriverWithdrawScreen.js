import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as Yup from "yup";

import Screen from '../../../components/Screen';
import HeaderItem from '../../../components/HeaderItem';
import Icon from '../../../components/Icon';
import defaultStyles from '../../../config/styles';
import AppText from '../../../components/AppText';
import {
    AppForm,
    AppFormField,
    AppFormButton,
    ErrorMessage
} from "../../../components/form";
import routes from '../../../navigation/routes';
import { sampleMonthWithdrawals, sampleTrips } from '../../../config/data';
import chauffeurApi from '../../../api/chauffeur';
import withdraw from '../../../api/withdraw';

const validationSchema = Yup.object().shape({
    withdrawal: Yup.number().required().min(1).max(10000).label("Withdrawal"),
});

function DriverWithdrawScreen({ navigation }) {
    const {user} = useAuth();
    const withdrawalInput = useRef();
    const [withdrawFailed, setWithdrawFailed] = useState(false);
    const [amount, setAmount] = useState(0);
    
    const successAlert = () => {
        Alert.alert('Withdraw Successful!', 'Your withdrawals have been transfered successfully.',
            [{ text: 'Okay', onPress: ()=>navigation.navigate(routes.DRIVER_ANALYTIC)}]
        )
    }

    const commonError = () => {
        Alert.alert('Error!', 'An unexpected error occured.',
            [{ text: 'Okay'}]
        )
    }

    const handleSubmit = async ({ withdrawal }, { resetForm }) => {
        if (withdrawal > amount) {
            resetForm();
            return setWithdrawFailed(true);
        }

        // {
        //     "amount": 240.20
        // }
        
        const result = await chauffeurApi.updateChauffeurAddWithdrawal(user.userId.toString(),{
            amount: parseFloat(withdrawal)
        })

        if(!result.ok){
            commonError();
            return;
        }

        setAmount(amount-withdrawal);
        setWithdrawFailed(false);
        resetForm();
        successAlert();
    }

    useEffect(()=>{
        let monthReceivable = 0;

        if(sampleTrips.length !== 0){
            const totalEarnings = sampleTrips.reduce((acc, item) => acc + (item.price || 0), 0);
            if(sampleMonthWithdrawals.length !== 0){
                const monthWithdrawals = sampleMonthWithdrawals.reduce((acc, item) => acc + (item.Withdrawal_Amount || 0), 0);
                monthReceivable = totalEarnings - monthWithdrawals;
            } else monthReceivable = totalEarnings;
        }

        setAmount(parseFloat(monthReceivable.toFixed(2)));
    }, [sampleMonthWithdrawals, sampleTrips])

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
                <AppText style={styles.text}>Withdraw Receivables</AppText>
                <AppText style={styles.balanceTitle}>{`Receivable Balance: \$${amount.toFixed(2)}`}</AppText>
            </View>
            <View style={styles.inputContainer}>
                <AppForm
                    initialValues={{
                        withdrawal:""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage error={`Amount entered is more than you can withdraw right now. Please enter a lower amount than \$${amount.toFixed(2)}.`} visible={withdrawFailed}/>
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>Amount:</AppText>
                        <AppFormField
                            keyboardType="numeric"
                            maxLength={8}
                            name="withdrawal"
                            placeholder="Withrawal"
                            icon="cash"
                            ref={withdrawalInput}
                        />
                    </View>
                    <AppFormButton title="Confirm" />
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
    balanceTitle: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 15,
        color: defaultStyles.colors.green
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
        marginBottom: 5
    }
})

export default DriverWithdrawScreen;