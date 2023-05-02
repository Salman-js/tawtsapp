import React from 'react';
import 'react-native-gesture-handler';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import DrawerStack from './drawerStack';
import UserScreen from './userScreen';
import NewPostScreen from './newPostScreen';
import PostScreen from './postScreen';
import SignInScreen from './loginScreen';
import SignUpScreen from './signUpScreen';
import UsersScreen from './usersScreen';
import IntroScreen from './intro';

const Stack = createStackNavigator();
export default function AuthStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        name='Intro'
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Sign In'
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Sign Up'
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Main'
        component={DrawerStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='User'
        component={UserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Post'
        component={PostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='New Post'
        component={NewPostScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name='Users'
        component={UsersScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
    </Stack.Navigator>
  );
}
