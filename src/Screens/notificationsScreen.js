import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import React from 'react';
import { Surface } from '@react-native-material/core';
import NotificationItem from '../Components/notificationItem';

const NotificationsScreen = () => {
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-14 rounded-b-xl bg-transparent'
        )}
        elevation={3}
      >
        <Text className='text-3xl font-bold text-slate-400 my-auto'>
          Notifications
        </Text>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pb-16')}
        showsVerticalScrollIndicator={false}
      >
        <Text className='text-2xl font-bold text-slate-200 my-auto mb-3 pl-3'>
          Today
        </Text>
        <NotificationItem type='like' />
        <NotificationItem type='follow' />
        <NotificationItem type='comment' />
        <NotificationItem type='retweet' />
        <Text className='text-2xl font-bold text-slate-200 my-auto mb-3 pl-3'>
          Yesterday
        </Text>
        <NotificationItem type='like' />
        <NotificationItem type='follow' />
        <NotificationItem type='comment' />
        <NotificationItem type='retweet' />
        <Text className='text-2xl font-bold text-slate-200 my-auto mb-3 pl-3'>
          Older
        </Text>
        <NotificationItem type='like' />
        <NotificationItem type='follow' />
        <NotificationItem type='comment' />
        <NotificationItem type='retweet' />
        <NotificationItem type='follow' />
        <NotificationItem type='comment' />
        <NotificationItem type='follow' />
        <NotificationItem type='comment' />
        <NotificationItem type='follow' />
        <NotificationItem type='comment' />
        <NotificationItem type='follow' />
        <NotificationItem type='comment' />
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
