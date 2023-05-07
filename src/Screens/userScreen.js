import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import React, { useEffect, useRef } from 'react';
import {
  Avatar,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Material from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import PostItem from '../Components/postItem';
import { useRoute } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyBookmarks, getUserTawts } from '../api/tawts';
import { getMyFollowings, getUserProfile } from '../api/user';
import { useToast } from 'react-native-toast-notifications';
import { RefreshControl } from 'react-native';
import UserPostItem from '../Components/Post Items/userPostItem';
import FollowItem from '../Components/followItem';

const UserScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const route = useRoute();
  const { userItem } = route.params;
  const toast = useToast(null);
  const myFollowingsQuery = useQuery({
    queryKey: ['followings'],
    queryFn: () => getMyFollowings(),
  });
  const { data, isLoading, refetch, isInitialLoading } = useQuery({
    queryKey: ['user', userItem.id],
    queryFn: () => getUserProfile(userItem.id),
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
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const tawtsQuery = useQuery({
    queryKey: ['tawts', 'user', userItem.id],
    queryFn: () => getUserTawts(userItem.id),
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
  useEffect(() => {
    const scrollToTop = navigation.addListener('tabPress', (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
  }, []);
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pt-28')}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
        refreshControl={
          <RefreshControl
            refreshing={isInitialLoading}
            onRefresh={() => {
              refetch();
              tawtsQuery.refetch();
            }}
          />
        }
      >
        <Surface
          style={tw.style('rounded-3xl p-3 mb-2', {
            backgroundColor: '#32283c',
          })}
          elevation={3}
        >
          <View className='w-full flex flex-row justify-start space-x-4'>
            {data && data.userAvatar ? (
              <Avatar
                image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
                size={60}
                style={tw.style('my-auto')}
              />
            ) : data && !data.userAvatar ? (
              <Avatar
                label={data.userName}
                size={60}
                style={tw.style('my-auto')}
              />
            ) : !data && userItem.avatar ? (
              <Avatar
                image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
                size={60}
                style={tw.style('my-auto')}
              />
            ) : (
              <Avatar
                label={userItem.userName}
                size={60}
                style={tw.style('my-auto')}
              />
            )}
            <View className='flex flex-row space-x-2'>
              <View className='rounded-xl bg-slate-600 overflow-hidden'>
                <Pressable
                  style={tw.style('flex justify-center items-center py-4 px-6')}
                >
                  <Text className='font-bold text-sm text-white'>
                    {tawtsQuery.data?.length}
                  </Text>
                  <Text className='font-light text-xs text-gray-300'>
                    Tawts
                  </Text>
                </Pressable>
              </View>
              <View className='rounded-xl bg-slate-600 overflow-hidden'>
                <Pressable
                  style={tw.style('flex justify-center items-center py-4 px-6')}
                >
                  <Text className='font-bold text-sm text-white'>
                    {data && data.followers}
                  </Text>
                  <Text className='font-light text-xs text-gray-300'>
                    Followers
                  </Text>
                </Pressable>
              </View>
              <View className='rounded-xl bg-slate-600 overflow-hidden'>
                <Pressable
                  style={tw.style('flex justify-center items-center py-4 px-6')}
                >
                  <Text className='font-bold text-sm text-white'>
                    {data && data.following}
                  </Text>
                  <Text className='font-light text-xs text-gray-300'>
                    Following
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View className='w-full flex justify-start pt-3'>
            <View className='w-full flex flex-row justify-between pr-3'>
              <View>
                <Text className='font-bold text-lg text-white'>
                  {!data ? userItem.userName : data.userName}
                </Text>
                <Text className='text-sm text-gray-400 text-left'>
                  @{!data ? userItem.userHandle : data.userHandle}
                </Text>
              </View>
              <FollowItem
                id={userItem.id}
                name={!data ? userItem.userName : data.userName}
              />
            </View>
            <Text className='text-sm text-gray-300 break-words text-left mt-3'>
              {data?.bio}
            </Text>
            <View className='w-full flex flex-row justify-start space-x-10 mt-3'>
              <View className='flex flex-row space-x-1'>
                <Ionicons
                  name='location-outline'
                  color='#6d829f'
                  size={15}
                  style={tw.style('my-auto')}
                />
                <Text className='text-sm text-gray-300 break-words text-left'>
                  {data?.location}
                </Text>
              </View>
              <View className='flex flex-row space-x-1'>
                <AntDesign
                  name='link'
                  color='#6d829f'
                  size={15}
                  style={tw.style('my-auto')}
                />
                <Text className='text-sm text-blue-300 break-words text-left'>
                  {data?.website}
                </Text>
              </View>
            </View>
          </View>
        </Surface>
        {tawtsQuery.data?.length ? (
          tawtsQuery.data.map((tawt) => (
            <UserPostItem key={tawt.id} item={tawt} />
          ))
        ) : (
          <View className='m-auto flex items-center justify-center mt-12'>
            <Material name='bubble-chart' color='#ece9e9' size={80} />
            <Text className='text-xl text-slate-200 mt-2 text-center'>
              No tawts
            </Text>
          </View>
        )}
      </ScrollView>
      <View className='absolute top-12 w-full flex flex-row justify-between px-4'>
        <IconButton
          icon={(props) => (
            <Icon name='chevron-left' {...props} color='#ece9e9' />
          )}
          style={tw.style('bg-black bg-opacity-25')}
          onPress={() => navigation.goBack()}
        />
        <IconButton
          icon={(props) => (
            <Icon name='dots-vertical' {...props} color='#ece9e9' />
          )}
          style={tw.style('bg-black bg-opacity-25')}
        />
      </View>
    </View>
  );
};

export default UserScreen;
