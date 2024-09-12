import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import About from '../../about';
import Home from '../../Home/home';
import { ABOUT_ROUTE, HOME_ROUTE } from '../../constants/routes';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={HOME_ROUTE} component={Home} />
      <Tab.Screen name={ABOUT_ROUTE} component={About} />
    </Tab.Navigator>
  );
}