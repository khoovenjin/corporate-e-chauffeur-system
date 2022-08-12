import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import DriverDutyNavigator from "./DriverDutyNavigator";
import DriverAnalyticNavigator from "./DriverAnalyticNavigator";
import DriverHistoryScreen from "../../screens/driver/activity/DriverHistoryScreen";
import DriverAccountNavigator from "./DriverAccountNavigator";

const Tab = createBottomTabNavigator();

const DriverAppNavigator = () => (
    <Tab.Navigator
        screenOptions={{headerShown: false}}
    >
        <Tab.Screen
            name="Home"
            component={DriverDutyNavigator}
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
            component={DriverAnalyticNavigator}
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
            component={DriverHistoryScreen}
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
            component={DriverAccountNavigator}
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

export default DriverAppNavigator;