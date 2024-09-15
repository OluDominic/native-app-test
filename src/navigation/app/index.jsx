import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigation from '../bottomNavigation';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomNavigation} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
