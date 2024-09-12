import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigation from './app';
import AuthNavigation from './auth';


const Stack = createNativeStackNavigator();

function AppNavigationContainer() {
    const [authenticated, setAuthenticated] = React.useState(false)
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {authenticated ? (<Stack.Group>
            <Stack.Screen name='App' component={AppNavigation} />
        </Stack.Group>) : (<Stack.Group>
            <Stack.Screen name='Auth' component={AuthNavigation}/>
        </Stack.Group>) }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigationContainer;