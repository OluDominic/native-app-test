import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import AppNavigation from './app';
import AuthNavigation from './auth';

const Stack = createStackNavigator();

function AppNavigationContainer() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const { authenticated } = useSelector(state => state.auth); // Redux

  useEffect(() => {
    const checkAuthStatus = async () => {
      const userData = await AsyncStorage.getItem('userData');
      setAuthenticated(userData !== null);
    };

    checkAuthStatus();
  }, [authenticated]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="MainApp" component={AppNavigation} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigationContainer;
