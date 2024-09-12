import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HOME_ROUTE } from '../../constants/routes';
import Home from '../../Home/home';

const AppStack = createNativeStackNavigator();
const AppNavigation =()=> {

    return (
        <AppStack.Navigator screenOptions={{headerShown: false}} initialRouteName={HOME_ROUTE}>
            <AppStack.Screen name={HOME_ROUTE} component={Home}/>
        </AppStack.Navigator>
    );
}

export default AppNavigation;