import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import React, { useEffect, useRef } from 'react';
import { Avatar, Pressable, Surface } from '@react-native-material/core';
import NotificationItem from '../Components/notificationItem';

const NotificationsScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  useEffect(() => {
    const scrollToTop = navigation.addListener('tabPress', (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
  }, []);
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-14 bg-transparent'
        )}
        elevation={1}
      >
        <View className='overflow-hidden rounded-full'>
          <Pressable onPress={() => navigation.openDrawer()}>
            <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={38}
              style={tw.style('my-auto')}
            />
          </Pressable>
        </View>
        <Text className='text-2xl font-bold text-slate-200 my-auto'>
          Notifications
        </Text>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pb-16')}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
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
