import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigation from './app';
import AuthNavigation from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

function AppNavigationContainer() {
    const [isAuthenticated, setAuthenticated] = useState(false);  // Local state for auth status
    const { authenticated } = useSelector(state => state.auth); // Pulling auth status from redux

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');  // Fetch user data from AsyncStorage
                setAuthenticated(userData !== null); // If userData exists, set authenticated to true
            } catch (error) {
                console.log('Error retrieving user data:', error);
            }
        };

        checkAuthStatus(); // Run this once when the app loads
    }, [authenticated]); // Run again if login success changes

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <Stack.Group>
                        <Stack.Screen name='App' component={AppNavigation} />
                    </Stack.Group>
                ) : (
                    <Stack.Group>
                        <Stack.Screen name='Auth' component={AuthNavigation} />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigationContainer;