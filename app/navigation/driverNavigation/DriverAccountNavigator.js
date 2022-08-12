import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DriverAccountScreen from "../../screens/driver/profile/DriverAccountScreen";
import DriverNotificationScreen from "../../screens/driver/profile/DriverNotificationScreen";
import DriverSecurityScreen from "../../screens/driver/profile/DriverSecurityScreen";
import DriverSettingScreen from "../../screens/driver/profile/DriverSettingScreen";

const Stack = createStackNavigator();

const DriverAccountNavigator = () => (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="DriverAccount" component={DriverAccountScreen} />
        <Stack.Screen name="DriverNotification" component={DriverNotificationScreen} />
        <Stack.Screen name="DriverSecurity" component={DriverSecurityScreen} />
        <Stack.Screen name="DriverSetting" component={DriverSettingScreen} />
    </Stack.Navigator>
)

export default DriverAccountNavigator;