import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DriveScreen from "../../screens/driver/DriveScreen";
import DriveFoundScreen from "../../screens/driver/DriveFoundScreen";
import DriveOnDutyScreen from "../../screens/driver/DriveOnDutyScreen";

const Stack = createStackNavigator();

const DriverDutyNavigator = () => (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="DriveMain" component={DriveScreen} />
        <Stack.Screen name="DriveFound" component={DriveFoundScreen} />
        <Stack.Screen name="DriveOnDuty" component={DriveOnDutyScreen} />
    </Stack.Navigator>
)

export default DriverDutyNavigator;