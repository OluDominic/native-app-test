import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import About from '../../about';
import Home from '../../Home/home';
import { ABOUT_ROUTE, HOME_ROUTE } from '../../constants/routes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name={HOME_ROUTE} 
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome 
              name="home"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name={ABOUT_ROUTE} 
        component={About}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome 
              name="info-circle"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: 'About',
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
