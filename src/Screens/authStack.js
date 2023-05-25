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
import NewReplyScreen from './newReplyScreen';
import EditProfileScreen from './editProfileScreen';
import SearchInputScreen from './searchInputScreen';
import ReplyToReplyScreen from './replyToReplyScreen';
import ReplyScreen from './replyScreen';
import ReplyReplyScreen from './replyReplyScreen';
import ReplyLikesScreen from './replyLikesScreen';
import SelectInterestsScreen from './selectInterestsScreen';
import SelectTopicsScreen from './selectTopicsScreen';
import UserSuggestionsScreen from './userSuggestions';

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
        name='Interests'
        component={SelectInterestsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Select Topics'
        component={SelectTopicsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='User Suggestions'
        component={UserSuggestionsScreen}
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
        name='Reply'
        component={ReplyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Reply Reply'
        component={ReplyReplyScreen}
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
        name='New Reply'
        component={NewReplyScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name='Reply To Reply'
        component={ReplyToReplyScreen}
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
      <Stack.Screen
        name='Reply Likes'
        component={ReplyLikesScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name='Edit Profile'
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Search Input'
        component={SearchInputScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalTransition,
        }}
      />
    </Stack.Navigator>
  );
}
