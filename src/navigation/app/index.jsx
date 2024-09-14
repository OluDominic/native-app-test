import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ABOUT_ROUTE, HOME_ROUTE } from '../../constants/routes';
import Home from '../../Home/home';
import About from '../../about';
import BottomNavigation from '../bottomNavigation';

const AppStack = createNativeStackNavigator();
const AppNavigation =()=> {

    return (
        <AppStack.Navigator screenOptions={{headerShown: false}}>
            <AppStack.Screen name={'Main'} component={BottomNavigation}/>
        </AppStack.Navigator>
    );
}

export default AppNavigation;