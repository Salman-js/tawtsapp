import { View, Text } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {
  Avatar,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ago from 's-ago';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  bookmarkTawt,
  likeTawt,
  removeBookmark,
  unlikeTawt,
} from '../api/tawts';

const UserPostItem = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const route = useRoute();
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: likeTawt,
    onMutate: (id) => {
      queryClient.setQueryData(['likes'], (oldLikes) => {
        return [
          ...oldLikes,
          {
            userId: user.id,
            id: new Date().getTime(),
            postId: id,
            createdAt: new Date().getTime(),
          },
        ];
      });
      queryClient.setQueryData(['tawts', 'user', item.userId], (oldTawts) => {
        let newTawts = oldTawts;
        newTawts[newTawts.findIndex((tawt) => tawt.id === item.id)] = {
          ...newTawts[newTawts.findIndex((tawt) => tawt.id === item.id)],
          likes:
            newTawts[newTawts.findIndex((tawt) => tawt.id === item.id)].likes +
            1,
        };
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['likes'], { exact: true });
      queryClient.invalidateQueries(['tawts', 'user', item.userId], {
        exact: true,
      });
      queryClient.invalidateQueries(['tawts'], { exact: true });
    },
  });
  const unlikeMutation = useMutation({
    mutationFn: unlikeTawt,
    onMutate: (id) => {
      queryClient.setQueryData(['likes'], (oldLikes) => {
        return oldLikes.filter((liked) => liked.postId !== id);
      });
      queryClient.setQueryData(['tawts', 'user', item.userId], (oldTawts) => {
        let newTawts = oldTawts;
        newTawts[newTawts.findIndex((tawt) => tawt.id === item.id)] = {
          ...newTawts[newTawts.findIndex((tawt) => tawt.id === item.id)],
          likes:
            newTawts[newTawts.findIndex((tawt) => tawt.id === item.id)].likes -
            1,
        };
      });
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['likes'], { exact: true });
      queryClient.invalidateQueries(['tawts', 'user', item.userId], {
        exact: true,
      });
      queryClient.invalidateQueries(['tawts'], { exact: true });
    },
  });
  const bookmarkMutation = useMutation({
    mutationFn: bookmarkTawt,
    onMutate: (id) => {
      queryClient.setQueryData(['bookmarks'], (oldLikes) => {
        return [
          ...oldLikes,
          {
            userId: user.id,
            id: new Date().getTime(),
            postId: id,
            createdAt: new Date().getTime(),
          },
        ];
      });
      queryClient.setQueryData(['tawts', 'user', item.userId], (oldTawts) => {
        let newTawts = oldTawts;
        newTawts[newTawts.findIndex((tawt) => tawt.id === item.id)] = {
          ...newTawts[newTawts.findIndex((tawt) => tawt.id === item.id)],
          bookmarks:
            newTawts[newTawts.findIndex((tawt) => tawt.id === item.id)]
              .bookmarks + 1,
        };
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookmarks'], { exact: true });
      queryClient.invalidateQueries(['tawts', 'user', item.userId], {
        exact: true,
      });
      queryClient.invalidateQueries(['tawts'], { exact: true });
    },
  });
  const unbookmarkMutation = useMutation({
    mutationFn: removeBookmark,
    onMutate: (id) => {
      queryClient.setQueryData(['bookmarks'], (oldLikes) => {
        return oldLikes.filter((liked) => liked.postId !== id);
      });
      queryClient.setQueryData(['tawts', 'user', item.userId], (oldTawts) => {
        let newTawts = oldTawts;
        newTawts[newTawts.findIndex((tawt) => tawt.id === item.id)] = {
          ...newTawts[newTawts.findIndex((tawt) => tawt.id === item.id)],
          bookmarks:
            newTawts[newTawts.findIndex((tawt) => tawt.id === item.id)]
              .bookmarks - 1,
        };
      });
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookmarks'], { exact: true });
      queryClient.invalidateQueries(['tawts', 'user', item.userId], {
        exact: true,
      });
      queryClient.invalidateQueries(['tawts'], { exact: true });
    },
  });
  function onLike() {
    likeMutation.mutate(item.id);
  }

  function unLike() {
    unlikeMutation.mutate(item.id);
  }
  function onBookmark() {
    bookmarkMutation.mutate(item.id);
  }

  function unBookmark() {
    unbookmarkMutation.mutate(item.id);
  }
  return (
    <Surface
      style={tw.style('rounded-3xl overflow-hidden mb-2', {
        backgroundColor: '#32283c',
      })}
      elevation={3}
    >
      <Pressable
        style={tw.style('w-full p-4 pt-2')}
        onPress={() =>
          navigation.navigate('Post', {
            item,
          })
        }
      >
        <View className='w-full flex flex-row justify-between items-center'>
          <View className='overflow-hidden rounded-xl'>
            <Pressable style={tw.style('flex flex-row justify-start p-1')}>
              {item.userAvatar ? (
                <Avatar
                  image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
                  size={30}
                  style={tw.style('my-auto')}
                />
              ) : (
                <Avatar
                  label={item.userName}
                  size={30}
                  style={tw.style('my-auto')}
                />
              )}
              <View className='ml-2'>
                <View className='flex flex-row space-x-1'>
                  <Text className='font-bold text-gray-200'>Salman M.</Text>
                  <Text
                    className='text-sm text-gray-400 text-left'
                    numberOfLines={1}
                  >
                    @{item.userHandle}
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
        <View className='w-full'>
          <Text className='text-xs text-gray-100 break-words'>{item.body}</Text>
        </View>
        {route.name !== 'New Reply' && (
          <View className='w-full flex flex-row justify-between mt-3'>
            <View className='flex flex-row justify-start space-x-2'>
              <View className='flex flex-row'>
                <View className='rounded-full flex justify-center items-center overflow-hidden'>
                  <Pressable
                    style={tw.style('w-full p-2 flex-row')}
                    onPress={() =>
                      navigation.navigate('New Reply', {
                        item,
                      })
                    }
                  >
                    <Ionicons
                      name='chatbubble-ellipses-outline'
                      color='#ece9e9'
                      size={24}
                    />
                    <Text className='text-xs text-gray-100 break-words my-auto ml-2'>
                      {item.replies}
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View className='flex flex-row'>
                <View className='rounded-full flex justify-center items-center overflow-hidden'>
                  {queryClient
                    .getQueryData(['bookmarks'])
                    .find((liked) => parseInt(liked.postId) === item.id) ? (
                    <Pressable
                      style={tw.style('w-full p-2 flex-row')}
                      onPress={unBookmark}
                    >
                      <Ionicons name='bookmark' color='#a5acea' size={24} />
                      <Text className='text-xs text-gray-100 break-words my-auto ml-2'>
                        {item.bookmarks}
                      </Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      style={tw.style('w-full p-2 flex-row')}
                      onPress={onBookmark}
                    >
                      <Ionicons
                        name='bookmark-outline'
                        color='#ece9e9'
                        size={24}
                      />
                      <Text className='text-xs text-gray-100 break-words my-auto ml-2'>
                        {item.bookmarks}
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
              <View className='flex flex-row'>
                <View className='rounded-full flex justify-center items-center overflow-hidden'>
                  {queryClient
                    .getQueryData(['likes'])
                    .find((liked) => parseInt(liked.postId) === item.id) ? (
                    <Pressable
                      style={tw.style('w-full p-2 flex flex-row')}
                      onPress={unLike}
                    >
                      <Ionicons name='heart' color='#f22626' size={24} />
                      <Text className='text-xs text-gray-100 break-words my-auto ml-1'>
                        {item.likes}
                      </Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      style={tw.style('w-full p-2 flex flex-row')}
                      onPress={onLike}
                    >
                      <Ionicons
                        name='heart-outline'
                        color='#ece9e9'
                        size={24}
                      />
                      <Text className='text-xs text-gray-100 break-words my-auto ml-1'>
                        {item.likes}
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
      </Pressable>
    </Surface>
  );
};

export default UserPostItem;
