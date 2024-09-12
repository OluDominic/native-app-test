import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LOGIN_ROUTE, REGISTER_ROUTE, SPLASH_ROUTE } from '../../constants/routes';
import Splash from '../../welcome/splash';
import Login from '../../authentication/login';
import Register from '../../authentication/register';

const AuthStack = createNativeStackNavigator();
const AuthNavigation =()=> {

    return (
        <AuthStack.Navigator screenOptions={{headerShown: false}} initialRouteName={SPLASH_ROUTE}>
            <AuthStack.Screen name={SPLASH_ROUTE} component={Splash}/>
            <AuthStack.Screen name={LOGIN_ROUTE} component={Login}/>
            <AuthStack.Screen name={REGISTER_ROUTE} component={Register}/>
        </AuthStack.Navigator>
    );
}

export default AuthNavigation;