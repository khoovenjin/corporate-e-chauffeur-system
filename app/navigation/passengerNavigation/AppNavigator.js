import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HistoryScreen from "../../screens/passenger/activity/HistoryScreen";
import AnalyticScreen from "../../screens/passenger/analytics/AnalyticScreen";
import RideNavigator from "./RideNavigator";
import AccountNavigator from "./AccountNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator
        screenOptions={{headerShown: false}}
    >
        <Tab.Screen
            name="Home"
            component={RideNavigator}
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
            component={AnalyticScreen}
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
            component={HistoryScreen}
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
            component={AccountNavigator}
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

export default AppNavigator;