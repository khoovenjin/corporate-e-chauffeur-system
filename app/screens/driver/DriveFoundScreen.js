import React, {useState, useRef, useCallback, useEffect} from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import defaultStyles from '../../config/styles';
import Screen from '../../components/Screen';
import ListItemSeperator from '../../components/ListItemSeperator';
import AppBottomSheet from '../../components/bottomsheet/AppBottomSheet';
import routes from '../../navigation/routes';
import AppMapRoute from '../../components/AppMapRoute';

function DriveFoundScreen({ navigation, route }) {
    const requestDetails = route.params;
    console.log('DriveFound: ', requestDetails);

    const bottomSheetRef = useRef(null);

    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [position, setPosition] = useState({});

    const snapPoints = () => {
        return ['1%', '70%'];
    };

    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current.snapToIndex(index);
    }, []);

    useEffect(()=>{
        bottomSheetRef.current.close();
    },[])

    return (
        <Screen>
            <AppBottomSheet>
                <TouchableWithoutFeedback onPress={()=>bottomSheetRef.current.close()}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <AppText style={styles.headerText}>Ride Matched</AppText>
                        </View>
                        <View style={styles.subContainer}>
                            <View style={styles.profileContainer}>
                                <View style={styles.imageContainer}>
                                    <Image style={styles.image} source={require('../../assets/driver.png')}/>
                                </View>
                                <AppText style={styles.nameText}>{requestDetails.passengerDetails.name}</AppText>
                            </View>
                            <ListItemSeperator style={styles.detailsLining} />
                            <View style={styles.locationContainer}>
                                <AppText style={styles.locationTitle}>Pick-Up Location</AppText>
                                <View style={styles.locationDetails}>
                                    <Ionicons
                                        name="location-sharp" size={22} color={defaultStyles.colors.primary} />
                                    <AppText style={styles.locationSubTitle} numberOfLines={1}>{requestDetails.origin.address}</AppText>
                                </View>
                            </View>
                            <ListItemSeperator style={styles.detailsLining} />
                            <View style={styles.priceContainer}>
                                <AppText style={styles.priceTitle}>Ride Fare: </AppText>
                                <View style={styles.priceDetails}>
                                    <MaterialIcons name="attach-money" size={16} color={defaultStyles.colors.medium} />
                                    <AppText style={styles.priceTitle}>{requestDetails.rideInfo.rideFare}</AppText>
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <AppButton title="View Location" onPress={()=>handleSnapPress(1)} style={styles.button} textStyle={{fontSize: 13}}/>
                                <AppButton title="Accept" onPress={()=>navigation.navigate(routes.DRIVE_ON_DUTY, requestDetails)} style={styles.button} textStyle={{fontSize: 13}}/>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints()}
                    // onChange={handleSheetChanges}
                    overDragResistanceFactor={4}
                    // detached
                    enablePanDownToClose
                    backgroundStyle={sheetStyles.backgroundStyle}
                    handleStyle={sheetStyles.handleStyle}
                    handleIndicatorStyle={sheetStyles.handleIndicatorStyle}
                    onDismiss={() => setVisible(false)}
                >
                    <BottomSheetView>
                        <AppMapRoute
                            origin={position}
                            distance={distance}
                            duration={duration}
                            track={false}
                            pickUp={{
                                title: requestDetails.origin.title,
                                latitude: parseFloat(requestDetails.origin.latitude),
                                longitude: parseFloat(requestDetails.origin.longitude),
                                address: requestDetails.origin.address
                            }}
                            destination={{
                                title: requestDetails.destination.title,
                                latitude: parseFloat(requestDetails.destination.latitude),
                                longitude: parseFloat(requestDetails.destination.longitude),
                                address: requestDetails.destination.address
                            }}
                            style={{width: '100%', height: '100%'}}
                            handleChange={(updatedPosition) => setPosition(updatedPosition)}
                            handleDistance={(updatedDistance) => setDistance(updatedDistance)}
                            handleDuration={(updatedDuration) => setDuration(updatedDuration)}
                        />
                    </BottomSheetView>
                </BottomSheet>
            </AppBottomSheet>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    headerText: {
        color: defaultStyles.colors.green,
        fontWeight: 'bold',
        fontSize: 22
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: defaultStyles.colors.black
    },
    imageContainer: {
        marginBottom: 15
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    nameText: {
        color: defaultStyles.colors.black,
        fontWeight: 'bold',
        fontSize: 20
    },
    profileContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },
    locationContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    detailsLining: {
        width: '80%',
        height: 2,
        borderTopLeftRadius: 1,
        opacity: 0.7,
        backgroundColor: defaultStyles.colors.light,
        alignSelf: 'center'
    },
    locationTitle: {
        color: defaultStyles.colors.black,
        fontSize: 18,
        marginBottom: 7
    },
    locationDetails: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    locationSubTitle: {
        color: defaultStyles.colors.black,
        fontSize: 14,
        fontWeight: 'bold'
    },
    priceContainer: {
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 10
    },
    priceTitle: {
        color: defaultStyles.colors.medium,
        fontSize: 14,
        fontWeight: 'bold'
    },
    priceDetails: {
       flexDirection: 'row',
       alignItems: 'center' 
    },
    buttonContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 10
    },
    button: {
        width: 135,
        height: 50,
        borderRadius: 30,
        padding: 8
    },
    map: {
        height: '100%',
        width: '100%',
    },
    mapContainer: {
        width: '100%',
        height: '100%',
        alignItems:"center",
        zIndex: 0,
        elevation: 0
    },
})

const sheetStyles = StyleSheet.create({
    backgroundStyle: { // entireContainer
        backgroundColor: defaultStyles.colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    handleStyle: { // topHandleContainer
        backgroundColor: defaultStyles.colors.light,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    handleIndicatorStyle: { // topHandle
        width: '15%',
        backgroundColor: defaultStyles.colors.primary,
        opacity: 0.6
    }
})

export default DriveFoundScreen;