import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RideScreen from "../../screens/passenger/RideScreen";
import RidePickUpScreen from "../../screens/passenger/RidePickUpScreen";
import RideDetailsScreen from "../../screens/passenger/RideDetailsScreen";
import RideBookingScreen from "../../screens/passenger/RideBookingScreen";
import RidePaymentScreen from "../../screens/passenger/RidePaymentScreen";
import RideAddPaymentScreen from "../../screens/passenger/RideAddPaymentScreen";
import RideOnRideScreen from "../../screens/passenger/RideOnRideScreen";
import RideAssignScreen from "../../screens/passenger/RideAssignScreen";

const Stack = createStackNavigator();

const RideNavigator = () => (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="RideMain" component={RideScreen} />
        <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
        <Stack.Screen name="RidePickUp" component={RidePickUpScreen} />
        <Stack.Screen name="RideBooking" component={RideBookingScreen} />
        <Stack.Screen name="RidePayment" component={RidePaymentScreen} />
        <Stack.Screen name="RideAddPayment" component={RideAddPaymentScreen} />
        <Stack.Screen name="RideAssign" component={RideAssignScreen} />
        <Stack.Screen name="RideOnRide" component={RideOnRideScreen} />
    </Stack.Navigator>
)

export default RideNavigator;