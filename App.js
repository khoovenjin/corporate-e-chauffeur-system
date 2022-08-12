import React, {useState, useEffect} from 'react';
import {LogBox} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './app/navigation/navigationTheme';
import LoginNavigator from './app/navigation/LoginNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import AppNavigator from './app/navigation/passengerNavigation/AppNavigator';
import DriverAppNavigator from './app/navigation/driverNavigation/DriverAppNavigator';
import CorporateAppNavigator from './app/navigation/corporateNavigation/CorporateAppNavigator';

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested"
])

function App() {
  const [user, setUser] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if(user) setUser(user);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
    <NavigationContainer theme={navigationTheme}>
      {user && user.role==='passenger' && <AppNavigator/>}
      {user && user.role==='chauffeur' && <DriverAppNavigator/>}
      {user && user.role==='corporate' && <CorporateAppNavigator/>}
      {!user && <LoginNavigator />}
    </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;