import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LOGIN_ROUTE, ONBOARD_ROUTE, REGISTER_ROUTE, SPLASH_ROUTE } from '../../constants/routes';
import Splash from '../../welcome/splash';
import Login from '../../authentication/login';
import Register from '../../authentication/register';
import OnBoard from '../../authentication/onboard/onboard';

const AuthStack = createStackNavigator();
const AuthNavigation =()=> {

    return (
        <AuthStack.Navigator screenOptions={{headerShown: false}} initialRouteName={SPLASH_ROUTE}>
            <AuthStack.Screen name={SPLASH_ROUTE} component={Splash}/>
            <AuthStack.Screen name={LOGIN_ROUTE} component={Login}/>
            <AuthStack.Screen name={REGISTER_ROUTE} component={Register}/>
            <AuthStack.Screen name={ONBOARD_ROUTE} component={OnBoard}/>
        </AuthStack.Navigator>
    );
}

export default AuthNavigation;