import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CorporateScreen from "../../screens/corporate/CorporateScreen";
import CorporatePayScreen from "../../screens/corporate/CorporatePayScreen";
import CorporateConnectionScreen from "../../screens/corporate/CorporateConnectionScreen";
import CorporateOTPScreen from "../../screens/corporate/CorporateOTPScreen";
import CorporateOpenOTPScreen from "../../screens/corporate/CorporateOpenOTPScreen";

const Stack = createStackNavigator();

const CorporateManageNavigator = () => (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="ManageMain" component={CorporateScreen} />
        <Stack.Screen name="ManagePay" component={CorporatePayScreen} />
        <Stack.Screen name="ManageOTP" component={CorporateOTPScreen} />
        <Stack.Screen name="ManageOpenOTP" component={CorporateOpenOTPScreen} />
        <Stack.Screen name="ManageConnection" component={CorporateConnectionScreen} />
    </Stack.Navigator>
)

export default CorporateManageNavigator;