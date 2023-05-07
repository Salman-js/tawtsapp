import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import tw from 'twrnc';
import PostsSearchTab from './postsSearchTab';
import UsersSearchTab from './usersSearchTab';
import SearchTabBar from '../Components/Navigation Components/searchTabBar';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';

const Tab = createMaterialTopTabNavigator();

export default function SearchTabs() {
  return (
    <>
      <SearchTabBar />
      <Tab.Navigator
        screenOptions={{
          tabBarContentContainerStyle: tw.style('', {
            backgroundColor: '#271b2d',
          }),
          tabBarLabelStyle: tw.style('font-bold'),
          tabBarIndicatorContainerStyle: tw.style('bg-slate-200'),
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#959393',
        }}
        style={tw.style('', {
          backgroundColor: '#271b2d',
        })}
      >
        <Tab.Screen
          name='Search Posts'
          options={{
            tabBarLabel: 'Posts',
          }}
          component={PostsSearchTab}
        />
        <Tab.Screen
          name='Search Users'
          options={{
            tabBarLabel: 'Users',
          }}
          component={UsersSearchTab}
        />
      </Tab.Navigator>
    </>
  );
}
