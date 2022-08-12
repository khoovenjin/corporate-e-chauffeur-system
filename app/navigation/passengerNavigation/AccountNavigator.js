import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../../screens/passenger/profile/AccountScreen";
import NotificationScreen from "../../screens/passenger/profile/NotificationScreen";
import SecurityScreen from "../../screens/passenger/profile/SecurityScreen";
import SettingScreen from "../../screens/passenger/profile/SettingScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
)

export default AccountNavigator;