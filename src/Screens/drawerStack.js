import React from 'react';
import tw from 'twrnc';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useWindowDimensions } from 'react-native';
import BottomTab from './bottomTab';
import BookmarksScreen from './bookmarksScreen';
import CustomDrawer from '../Components/Navigation Components/drawer';
import GroupsScreen from './groupsScreen';

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerType: 'front',
        swipeMinDistance: 40,
        swipeEnabled: true,
        swipeEdgeWidth: 150,
        headerShown: false,
        drawerLabelStyle: tw.style('-ml-4 text-blue-300'),
        drawerInactiveTintColor: '#90b9f7',
        drawerStyle: tw.style('', {
          backgroundColor: '#271b2d',
        }),
      }}
    >
      <Drawer.Screen
        name='Home'
        component={BottomTab}
        options={{
          drawerLabel: '',
          drawerItemStyle: {
            display: 'none',
          },
        }}
        style={tw.style('h-0 bg-gray-600')}
      />
      <Drawer.Screen
        name='Bookmarks'
        component={BookmarksScreen}
        options={{
          drawerIcon: (props) => (
            <Ionicons name='bookmarks-outline' size={20} {...props} />
          ),
        }}
      />
      <Drawer.Screen
        name='Groups'
        component={GroupsScreen}
        options={{
          drawerIcon: (props) => (
            <Icons name='account-group-outline' size={20} {...props} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
