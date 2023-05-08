import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import React, { useEffect, useRef } from 'react';
import { Avatar, Pressable, Surface } from '@react-native-material/core';
import LikeNotificationItem from '../Components/Notification Components/likeNotificationItem';
import { useSelector } from 'react-redux';
import ReplyNotificationItem from '../Components/Notification Components/replyNotificationItem';
import FollowNotificationItem from '../Components/Notification Components/followNotificationItem';

const NotificationsScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const { user } = useSelector((state) => state.auth);
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
            {user?.avatar ? (
              <Avatar
                image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
                size={38}
                style={tw.style('my-auto')}
              />
            ) : (
              <Avatar
                label={user?.name}
                size={38}
                style={tw.style('my-auto')}
              />
            )}
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
        <LikeNotificationItem type='like' />
        <LikeNotificationItem type='follow' />
        <ReplyNotificationItem type='comment' />
        <FollowNotificationItem type='retweet' />
        <Text className='text-2xl font-bold text-slate-200 my-auto mb-3 pl-3'>
          Yesterday
        </Text>
        <LikeNotificationItem type='comment' />
        <LikeNotificationItem type='retweet' />
        <Text className='text-2xl font-bold text-slate-200 my-auto mb-3 pl-3'>
          Older
        </Text>
        <LikeNotificationItem type='comment' />
        <LikeNotificationItem type='retweet' />
        <LikeNotificationItem type='comment' />
        <LikeNotificationItem type='retweet' />
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
