import { View, Text, ScrollView, RefreshControl } from 'react-native';
import tw from 'twrnc';
import React, { useEffect, useRef } from 'react';
import { Avatar, Pressable, Surface } from '@react-native-material/core';
import LikeNotificationItem from '../Components/Notification Components/likeNotificationItem';
import Material from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import ReplyNotificationItem from '../Components/Notification Components/replyNotificationItem';
import FollowNotificationItem from '../Components/Notification Components/followNotificationItem';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getMyFollowings,
  getNotifications,
  isOlder,
  isToday,
  isYesterday,
  updateNotifCheckTime,
} from '../api/user';
import { useToast } from 'react-native-toast-notifications';
import { setUser } from '../../slices/authSlice';
import { useLayoutEffect } from 'react';

const NotificationsScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const toast = useToast(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const myFollowingsQuery = useQuery({
    queryKey: ['followings'],
    queryFn: () => getMyFollowings(),
  });
  const { data, isLoading, refetch, isInitialLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
    onError: (error) => {
      console.log('Request: ', error.request);
      console.log('Response: ', error.response);
      if (error.response) {
        if (error.response?.data.token) {
          toast.show('Session expired, Login required', {
            icon: <Feather name='alert-circle' size={20} color='white' />,
            placement: 'bottom',
            type: 'danger',
            duration: 4000,
            style: { marginBottom: 50 },
            textStyle: { padding: 0 },
          });
        }
        if (error.response.data.unknown) {
          toast.show('Server error. Please, try again', {
            icon: <Feather name='alert-circle' size={20} color='white' />,
            placement: 'bottom',
            type: 'danger',
            duration: 4000,
            style: { marginBottom: 50 },
            textStyle: { padding: 0 },
          });
        }
      } else if (error.request) {
        toast.show('Error connecting to the server', {
          icon: <Feather name='alert-circle' size={20} color='white' />,
          placement: 'bottom',
          type: 'danger',
          duration: 4000,
          style: { marginBottom: 50 },
          textStyle: { padding: 0 },
        });
      } else {
        toast.show('Unknown Error. Please, try again', {
          icon: <Feather name='alert-circle' size={20} color='white' />,
          placement: 'bottom',
          type: 'danger',
          duration: 4000,
          style: { marginBottom: 50 },
          textStyle: { padding: 0 },
        });
      }
    },
    onSuccess: (data) => {},
  });
  const updateNotificationCheckTime = useMutation({
    mutationFn: updateNotifCheckTime,
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications'], { exact: true });
      let updatedUser = user;
      if (updatedUser) {
        updatedUser.lastNotificationCheckTime = new Date().getTime();
        dispatch(setUser(updatedUser));
      }
    },
  });
  useEffect(() => {
    const scrollToTop = navigation.addListener('tabPress', (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
  }, []);
  useLayoutEffect(() => {
    setTimeout(() => {
      updateNotificationCheckTime.mutate();
    }, 5000);
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
        refreshControl={
          <RefreshControl
            refreshing={isInitialLoading}
            onRefresh={() => {
              refetch();
            }}
          />
        }
      >
        {data &&
        data.filter((item) => isToday(new Date(item.createdAt))).length ? (
          <View className='w-full'>
            <Text className='text-2xl font-bold text-slate-200 my-auto mb-3 pl-3'>
              Today
            </Text>
            {data
              .filter((item) => isToday(new Date(item.createdAt)))
              .map((item) => {
                if (item.actionType === 'like') {
                  return <LikeNotificationItem item={item} key={item.id} />;
                } else if (item.actionType === 'follow') {
                  return <FollowNotificationItem item={item} key={item.id} />;
                } else {
                  return <ReplyNotificationItem item={item} key={item.id} />;
                }
              })}
          </View>
        ) : null}
        {data &&
        data.filter((item) => isYesterday(new Date(item.createdAt))).length ? (
          <View className='w-full'>
            <Text className='text-2xl font-bold text-slate-200 my-auto mb-3 pl-3'>
              Yesterday
            </Text>
            {data
              .filter((item) => isYesterday(new Date(item.createdAt)))
              .map((item) => {
                if (item.actionType === 'like') {
                  return <LikeNotificationItem item={item} key={item.id} />;
                } else if (item.actionType === 'follow') {
                  return <FollowNotificationItem item={item} key={item.id} />;
                } else {
                  return <ReplyNotificationItem item={item} key={item.id} />;
                }
              })}
          </View>
        ) : null}
        {data &&
        data.filter((item) => isOlder(new Date(item.createdAt))).length ? (
          <View className='w-full'>
            <Text className='text-2xl font-bold text-slate-200 my-auto mb-3 pl-3'>
              Older
            </Text>
            {data
              .filter((item) => isOlder(new Date(item.createdAt)))
              .map((item) => {
                if (item.actionType === 'like') {
                  return <LikeNotificationItem item={item} key={item.id} />;
                } else if (item.actionType === 'follow') {
                  return <FollowNotificationItem item={item} key={item.id} />;
                } else {
                  return <ReplyNotificationItem item={item} key={item.id} />;
                }
              })}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
