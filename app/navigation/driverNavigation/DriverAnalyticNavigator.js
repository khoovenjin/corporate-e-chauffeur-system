import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DriverAnalyticScreen from "../../screens/driver/analytics/DriverAnalyticScreen";
import DriverWithdrawScreen from "../../screens/driver/analytics/DriverWithdrawScreen";

const Stack = createStackNavigator();

const DriverAnalyticNavigator = () => (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="DriverAnalytic" component={DriverAnalyticScreen} />
        <Stack.Screen name="DriverWithdraw" component={DriverWithdrawScreen} />
    </Stack.Navigator>
)

export default DriverAnalyticNavigator;