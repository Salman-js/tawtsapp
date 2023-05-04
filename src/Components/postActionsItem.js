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
import { useToast } from 'react-native-toast-notifications';
import {
  bookmarkTawt,
  likeTawt,
  removeBookmark,
  unlikeTawt,
} from '../api/tawts';

const PostActionsItem = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const route = useRoute();
  const toast = useToast(null);
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
            postId: item.id,
            createdAt: new Date().getTime(),
          },
        ];
      });
      queryClient.setQueryData(['tawts'], (oldTawts) => {
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
      queryClient.invalidateQueries(['tawts', item.id], { exact: true });
      queryClient.invalidateQueries(['likes'], { exact: true });
      queryClient.invalidateQueries(['tawts'], { exact: true });
      queryClient.invalidateQueries(['tawts', 'my'], { exact: true });
    },
  });
  const unlikeMutation = useMutation({
    mutationFn: unlikeTawt,
    onMutate: (id) => {
      queryClient.setQueryData(['likes'], (oldLikes) => {
        return oldLikes.filter((liked) => liked.postId !== item.id);
      });
      queryClient.setQueryData(['tawts'], (oldTawts) => {
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
      queryClient.invalidateQueries(['tawts', item.id], { exact: true });
      queryClient.invalidateQueries(['likes'], { exact: true });
      queryClient.invalidateQueries(['tawts'], { exact: true });
      queryClient.invalidateQueries(['tawts', 'my'], { exact: true });
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
            postId: item.id,
            createdAt: new Date().getTime(),
          },
        ];
      });
      queryClient.setQueryData(['tawts'], (oldTawts) => {
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
      queryClient.invalidateQueries(['tawts', item.id], { exact: true });
      queryClient.invalidateQueries(['bookmarks'], { exact: true });
      queryClient.invalidateQueries(['tawts'], { exact: true });
      queryClient.invalidateQueries(['tawts', 'my'], { exact: true });
    },
  });
  const unbookmarkMutation = useMutation({
    mutationFn: removeBookmark,
    onMutate: (id) => {
      queryClient.setQueryData(['bookmarks'], (oldLikes) => {
        return oldLikes.filter((liked) => liked.postId !== item.id);
      });
      queryClient.setQueryData(['tawts'], (oldTawts) => {
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
      queryClient.invalidateQueries(['tawts', item.id], { exact: true });
      queryClient.invalidateQueries(['bookmarks'], { exact: true });
      queryClient.invalidateQueries(['tawts'], { exact: true });
      queryClient.invalidateQueries(['tawts', 'my'], { exact: true });
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
    <View className='w-full flex flex-row justify-between mt-1'>
      <View className='flex flex-row justify-start space-x-2'>
        <View className='flex flex-row'>
          <IconButton
            icon={(props) => (
              <Ionicons
                name='chatbubble-ellipses-outline'
                {...props}
                color='#ebe5e5'
                size={24}
              />
            )}
            onPress={() =>
              navigation.navigate('New Reply', {
                item,
              })
            }
          />
        </View>
        <View className='flex flex-row'>
          {queryClient
            .getQueryData(['bookmarks'])
            .find((liked) => parseInt(liked.postId) === item.id) ? (
            <IconButton
              icon={(props) => (
                <Ionicons
                  name='bookmark'
                  {...props}
                  color='#a5acea'
                  size={24}
                />
              )}
              onPress={unBookmark}
            />
          ) : (
            <IconButton
              icon={(props) => (
                <Ionicons
                  name='bookmark-outline'
                  {...props}
                  color='#ece9e9'
                  size={24}
                />
              )}
              onPress={onBookmark}
            />
          )}
        </View>
        <View className='flex flex-row'>
          {queryClient
            .getQueryData(['likes'])
            .find((liked) => parseInt(liked.postId) === item.id) ? (
            <IconButton
              icon={(props) => (
                <Ionicons name='heart' {...props} color='#f01818' size={24} />
              )}
              onPress={unLike}
            />
          ) : (
            <IconButton
              icon={(props) => (
                <Ionicons
                  name='heart-outline'
                  {...props}
                  color='#ebe5e5'
                  size={24}
                />
              )}
              onPress={onLike}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default PostActionsItem;
