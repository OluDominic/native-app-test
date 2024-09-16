import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

import Splash from '../welcome/splash';
import Login from '../authentication/login';
import Register from '../authentication/register';
import OnBoard from '../authentication/onboard/onboard';

import { LOGIN_ROUTE, ONBOARD_ROUTE, REGISTER_ROUTE, SPLASH_ROUTE } from '../constants/routes';
import AppNavigation from './app';

const Stack = createStackNavigator();

function AppNavigationContainer() {
    const [isAuthenticated, setAuthenticated] = useState(null); // Initialize as null to show loading state
    const { authenticated } = useSelector(state => state.auth);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                setAuthenticated(userData !== null);
            } catch (error) {
                console.log('Error retrieving user data:', error);
                setAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, [authenticated]);

    if (isAuthenticated === null) {
        // Show a loading spinner or splash screen while checking authentication
        return <Splash />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name={SPLASH_ROUTE} component={Splash} />
                        <Stack.Screen name={LOGIN_ROUTE} component={Login} />
                        <Stack.Screen name={REGISTER_ROUTE} component={Register} />
                        <Stack.Screen name={ONBOARD_ROUTE} component={OnBoard} />
                        <Stack.Screen name="AppTabs" component={AppNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigationContainer;