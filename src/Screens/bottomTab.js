import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import tw from 'twrnc';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import HomeScreen from './homeScreen';
import ProfileScreen from './profileScreen';
import SavedScreen from './savedScreen';
import OrdersScreen from './ordersScreen';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: tw.style('h-16'),
        tabBarLabelStyle: tw.style('-mt-2 mb-2', {
          fontSize: 12,
        }),
        tabBarHideOnKeyboard: true,
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Tab.Screen
        name='Landing'
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: (props) => <Octicons name='home' {...props} size={30} />,
        }}
      />
      <Tab.Screen
        name='Orders'
        component={OrdersScreen}
        options={{
          title: 'Orders',
          tabBarIcon: (props) => <Feather name='truck' {...props} size={30} />,
        }}
      />
      <Tab.Screen
        name='Saved'
        component={SavedScreen}
        options={{
          title: 'Saved',
          tabBarIcon: (props) => (
            <Feather name='bookmark' {...props} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: (props) => <Feather name='user' {...props} size={30} />,
        }}
      />
    </Tab.Navigator>
  );
}
