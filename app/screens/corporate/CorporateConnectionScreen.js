import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';

import Screen from '../../components/Screen';
import defaultStyles from '../../config/styles';
import GradientHeader from '../../components/GradientHeader';
import AppIconButton from '../../components/AppIconButton';
import AppText from '../../components/AppText';
import NotificationListItem from '../../components/accountprofile/NotificationListItem';
import { sampleTrips } from '../../config/data';
import ListItemSeperator from '../../components/ListItemSeperator';
import corporateApi from '../../api/corporate';

function CorporateConnectionScreen({ navigation }) {
    const {user} = useAuth();
    const [amount, setAmount] = useState(0);
    const [selected, setSelected] = useState(1);
    const [userInfo, setUserInfo] = useState({});
    const [passengerlist, setPassengerList] = useState([]);

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
        setAmount(getResult.data.passenger_list.length);
        setPassengerList(getResult.data.passenger_list)
    }

    useEffect(()=>{
        getUserInfo();
    },[])

    // useEffect(()=>{
    //     const connection = sampleTrips.length;
    //     setAmount(connection);
    // }, [sampleTrips])

    const deletePassenger = async () => {
        if(!selected){
            return;
        }

        console.log(selected);
        const result = await corporateApi.updateCorporateDeletePassengerConnection(user.userId.toString(), {
            _id: selected
        });

        // if(!result.ok){
        //     commonError();
        //     return;
        // }

        successAlert();
    }

    return (
        <Screen>
            <ScrollView>
                <GradientHeader 
                    title="Corporate Connection"
                    subUnit="COUNT"
                    subTitle={amount}
                    onPress={()=>navigation.goBack()}
                />
                <View style={styles.buttonContainer}>
                    <AppIconButton 
                        title="Remove"
                        icon="account-remove-outline"
                        size={20}
                        color={defaultStyles.colors.primary}
                        onPress={()=>{
                            deletePassenger();
                        }}
                    />
                </View>
                <ListItemSeperator style={styles.seperatorLining}/>
                <View style={styles.detailsContainer}>
                    <AppText style={styles.title}>Corporate Connection</AppText>
                    <View style={styles.list}>
                        <FlatList 
                            data={passengerlist}
                            keyExtractor={item=>item._id.toString()}
                            renderItem={({item}) =>
                                <NotificationListItem 
                                    title={item.name}
                                    subTitle={item.email}
                                    icon="account-key-outline"
                                    styleTitle={defaultStyles.recentTitle}
                                    onPress={() => setSelected(item._id)}
                                    date={item.date}
                                    lining={item._id !== selected?
                                        {
                                            borderColor: defaultStyles.colors.light,
                                        }: null
                                    }
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

export default CorporateConnectionScreen;