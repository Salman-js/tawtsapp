import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import tw from 'twrnc';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import HomeScreen from './homeScreen';
import NotificationsScreen from './notificationsScreen';
import ProfileScreen from './profileScreen';
import SearchTabs from './searchNavigator';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getNotifications } from '../api/user';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const { user } = useSelector((state) => state.auth);
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
  });
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: tw.style('h-16 rounded-t-2xl shadow-lg', {
          backgroundColor: '#32283c',
          borderTopWidth: 0,
          borderLeftWidth: 0.2,
          borderRightWidth: 0.2,
          position: 'absolute',
        }),
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarBadgeStyle: tw.style(
          'mt-2 -ml-1 text-xs flex justify-center items-center bg-slate-200 font-semibold border-2',
          {
            paddingTop: 2,
            borderColor: '#32283c',
          }
        ),
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Tab.Screen
        name='Landing'
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => <Octicons name='home' {...props} size={27} />,
        }}
      />
      <Tab.Screen
        name='Search'
        component={SearchTabs}
        options={{
          tabBarIcon: (props) => (
            <Ionicons name='search-outline' {...props} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={NotificationsScreen}
        options={{
          tabBarIcon: (props) => (
            <SimpleLineIcons name='bell' {...props} size={25} />
          ),
          tabBarBadge: data.filter(
            (notif) => notif.createdAt > user?.lastNotificationCheckTime
          ).length
            ? data.filter(
                (notif) => notif.createdAt > user?.lastNotificationCheckTime
              ).length
            : null,
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: (props) => <AntDesign name='user' {...props} size={27} />,
        }}
      />
    </Tab.Navigator>
  );
}
