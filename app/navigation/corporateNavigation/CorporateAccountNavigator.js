import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CorporateAccountScreen from "../../screens/corporate/profile/CorporateAccountScreen";
import CorporateNotificationScreen from "../../screens/corporate/profile/CorporateNotificationScreen";
import CorporateSecurityScreen from "../../screens/corporate/profile/CorporateSecurityScreen";
import CorporateSettingScreen from "../../screens/corporate/profile/CorporateSettingScreen";

const Stack = createStackNavigator();

const CorporateAccountNavigator = () => (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="CorporateAccount" component={CorporateAccountScreen} />
        <Stack.Screen name="CorporateNotification" component={CorporateNotificationScreen} />
        <Stack.Screen name="CorporateSecurity" component={CorporateSecurityScreen} />
        <Stack.Screen name="CorporateSetting" component={CorporateSettingScreen} />
    </Stack.Navigator>
)

export default CorporateAccountNavigator;