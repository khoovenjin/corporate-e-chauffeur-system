import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CorporateManageNavigator from "./CorporateManageNavigator";
import CorporateAnalyticScreen from "../../screens/corporate/analytics/CorporateAnalyticScreen";
import CorporateHistoryScreen from "../../screens/corporate/activity/CorporateHistoryScreen";
import CorporateAccountNavigator from "./CorporateAccountNavigator";

const Tab = createBottomTabNavigator();

const CorporateAppNavigator = () => (
    <Tab.Navigator
        screenOptions={{headerShown: false}}
    >
        <Tab.Screen
            name="Home"
            component={CorporateManageNavigator}
            options={{
                tabBarIcon: ({color, size}) =>
                <MaterialCommunityIcons
                    name="home"
                    color={color}
                    size={size}
                />
            }}
        />
        <Tab.Screen 
            name="Analytic" 
            component={CorporateAnalyticScreen}
            options={{
                tabBarIcon: ({color, size}) =>
                <MaterialCommunityIcons
                    name="chart-bar"
                    color={color}
                    size={size}
                />
            }}
        />
        <Tab.Screen 
            name="History" 
            component={CorporateHistoryScreen}
            options={{
                tabBarIcon: ({color, size}) =>
                <MaterialCommunityIcons
                    name="history"
                    color={color}
                    size={size}
                />
            }}
        />
        <Tab.Screen 
            name="Profile" 
            component={CorporateAccountNavigator}
            options={{
                tabBarIcon: ({color, size}) =>
                <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={size}
                />
            }}
        />
    </Tab.Navigator>
)

export default CorporateAppNavigator;