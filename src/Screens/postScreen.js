import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Material from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import tw from 'twrnc';
import {
  Avatar,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import CommentItem from '../Components/commentItem';
import { useNavigation } from '@react-navigation/native';
import ago from 's-ago';
import { getPostLikes, getReplies, getTawt } from '../api/tawts';
import { useQuery } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';
import PostActionsItem from '../Components/postActionsItem';
import { RefreshControl } from 'react-native';

const PostScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const { item } = route.params;
  const toast = useToast(null);
  const { data, isLoading, refetch, isInitialLoading } = useQuery({
    queryKey: ['tawts', item.id],
    queryFn: () => getTawt(item.id),
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
  });
  const repliesQuery = useQuery({
    queryKey: ['replies', item.id],
    queryFn: () => getReplies(item.id),
  });
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-start p-4 pt-14 rounded-b-xl bg-transparent'
        )}
      >
        <IconButton
          icon={(props) => (
            <Feather name='chevron-left' {...props} color='#ebe5e5' size={30} />
          )}
          onPress={() => navigation.goBack()}
        />
        <Text className='text-2xl font-semibold text-slate-200 my-auto ml-3'>
          Tawt.
        </Text>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2')}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isInitialLoading}
            onRefresh={() => {
              refetch();
              repliesQuery.refetch();
            }}
          />
        }
      >
        <Surface
          style={tw.style('w-full rounded-3xl overflow-hidden mb-2 p-4 pt-2', {
            backgroundColor: '#32283c',
          })}
          elevation={3}
        >
          <View className='w-full flex flex-row justify-between items-center'>
            <View className='overflow-hidden rounded-xl'>
              <Pressable
                style={tw.style('flex flex-row justify-start p-1')}
                onPress={() =>
                  navigation.navigate(
                    item.userHandle === user?.handle ? 'Profile' : 'User'
                  )
                }
              >
                {!data ? (
                  item.userAvatar
                ) : data.userAvatar ? (
                  <Avatar
                    image={{
                      uri: 'https://mui.com/static/images/avatar/1.jpg',
                    }}
                    size={38}
                    style={tw.style('my-auto')}
                  />
                ) : (
                  <Avatar
                    label={item.userName}
                    size={38}
                    style={tw.style('my-auto')}
                  />
                )}
                <View className='ml-2'>
                  <View className='flex flex-row space-x-1'>
                    <Text className='text-lg font-bold text-gray-200'>
                      {!data ? item.userName : data.userName}
                    </Text>
                    <Text
                      className='text-base text-gray-400 text-left'
                      numberOfLines={1}
                    >
                      @{!data ? item.userHandle : data.userName}
                    </Text>
                  </View>
                  <Text className='text-xs font-light text-gray-300'>
                    {ago(new Date(item.createdAt))}
                  </Text>
                </View>
              </Pressable>
            </View>
            <IconButton
              icon={(props) => (
                <Icon name='dots-horizontal' {...props} color='#ece9e9' />
              )}
              style={tw.style('')}
            />
          </View>
          <View className='w-full mt-2'>
            <Text className='text-sm text-gray-100 break-words'>
              {item.body}
            </Text>
            <View className='w-full flex flex-row justify-start space-x-2 mt-3'>
              <Text className='my-auto text-base text-gray-100 break-words'>
                {!data ? item.bookmarks : data.bookmarks}{' '}
                <Text className='font-bold'>
                  Bookmark{item.bookmarks > 1 && 's'}
                </Text>
              </Text>
              <Pressable
                style={tw.style('my-auto')}
                onPress={() =>
                  navigation.navigate('Users', {
                    type: 'likes',
                    item: !data ? item : data,
                  })
                }
              >
                <Text className='text-base text-gray-100 break-words'>
                  {!data ? item.likes : data.likes}{' '}
                  <Text className='font-bold'>Like{item.likes > 1 && 's'}</Text>
                </Text>
              </Pressable>
            </View>
          </View>
          <PostActionsItem item={!data ? item : data} />
        </Surface>
        <View className='w-full rounded-3xl bg-[#32283c] p-4 mt-2'>
          <Text className='text-xl font-bold text-gray-200 pl-4 mb-2'>
            Replies
          </Text>
          {repliesQuery.data?.length ? (
            repliesQuery.data.map((reply) => (
              <CommentItem key={reply.id} item={reply} />
            ))
          ) : (
            <View className='m-auto flex items-center justify-center mt-12'>
              <Material name='bubble-chart' color='#ece9e9' size={80} />
              <Text className='text-xl text-slate-200 mt-2 text-center'>
                No replies
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PostScreen;
