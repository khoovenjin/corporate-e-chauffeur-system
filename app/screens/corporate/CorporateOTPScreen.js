import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';

import Screen from '../../components/Screen';
import defaultStyles from '../../config/styles';
import GradientHeader from '../../components/GradientHeader';
import AppIconButton from '../../components/AppIconButton';
import AppText from '../../components/AppText';
import ListItemSeperator from '../../components/ListItemSeperator';
import routes from '../../navigation/routes';
import { openPaymentList } from '../../config/data';
import OTPListItem from '../../components/OTPListItem';
import corporateApi from '../../api/corporate';

function CorporateOTPScreen({ navigation }) {
    const {user} = useAuth();
    const [amount, setAmount] = useState(0);
    const [selected, setSelected] = useState();
    const [showOTP, setShowOTP] = useState(false);
    const [otplist, setOTPList] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [pincode, setPincode] = useState('');

    const successAlert = () => {
        Alert.alert('Deletion Successful!', 'Your OTP has been deleted successfully.',
            [{ text: 'Okay'}]
        )
    }

    const commonError = () => {
        Alert.alert('Error!', 'An unexpected error occured.',
            [{ text: 'Okay'}]
        )
    }

    const getUserInfo = async () => {
        const getResult = await corporateApi.getCorporateById(user.userId.toString());

        if(!getResult.ok){
            commonError();
            return;
        }

        setUserInfo(getResult.data);
        setAmount(getResult.data.open_otp.length);
        setOTPList(getResult.data.open_otp)
    }

    useEffect(()=>{
        getUserInfo();
    },[])

    // useEffect(()=>{
    //     const OTPcount = openPaymentList.length;
    //     setAmount(OTPcount);

    // }, [openPaymentList])

    const deleteOTP = async () => {
        if(!selected){
            return;
        }

        // {
        //     "name": "Sunway Berhad",
        //     "pincode": "pW0@da"
        // }

        const result = await corporateApi.updateCorporateDeleteOpenOTP(user.userId.toString(), {
            name: user.name,
            pincode: pincode
        });

        if(!result.ok){
            commonError();
            return;
        }

        successAlert();
    }

    return (
        <Screen>
            <ScrollView>
                <GradientHeader 
                    title="One-time Password (OTP)"
                    subUnit="COUNT"
                    subTitle={amount}
                    onPress={()=>navigation.goBack()}
                />
                <View style={styles.buttonContainer}>
                    <AppIconButton 
                        title="Create"
                        icon="key-plus"
                        size={20}
                        color={defaultStyles.colors.primary}
                        onPress={()=>navigation.navigate(routes.MANAGE_OPEN_OTP)}
                        style={{marginRight: 10}}
                    />
                    <AppIconButton 
                        title="Delete"
                        icon="trash-can-outline"
                        size={20}
                        color={defaultStyles.colors.primary}
                        onPress={()=>{
                            deleteOTP();
                        }
                        // console.log('Item',
                        //     openPaymentList.filter((elem)=>{
                        //         return elem.id === selected;
                        //     }))
                        }
                    />
                </View>
                <ListItemSeperator style={styles.seperatorLining}/>
                <View style={styles.detailsContainer}>
                    <AppText style={styles.title}>One-time Password</AppText>
                    <View style={styles.list}>
                        <FlatList 
                            data={otplist}
                            keyExtractor={item=>item._id.toString()}
                            renderItem={({item}) =>
                                <OTPListItem
                                    title={item.name}
                                    subTitle='Corporate'
                                    icon="key-link"
                                    onPress={() => {
                                        setSelected(item._id)
                                        setPincode(item.pincode)
                                    }}
                                    lining={item._id !== selected?
                                        {
                                            borderColor: defaultStyles.colors.light,
                                        }: null
                                    }
                                    value={showOTP? item.pincode: '******' }
                                    handleShow={()=>{
                                        console.log('Executed')
                                        setShowOTP(!showOTP)
                                    }}
                                />
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        padding: 20,
    },
    detailsContainer: {
        padding: 20
    },
    list: {
        marginTop: 20,
    },
    seperatorLining: {
        padding: 3,
        backgroundColor: defaultStyles.colors.light
    },
    title: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default CorporateOTPScreen;