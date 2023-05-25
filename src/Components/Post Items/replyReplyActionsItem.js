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
import { likeReply, unlikeReply } from '../../api/tawts';

const ReplyReplyActionsItem = ({ item, reply }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: likeReply,
    onMutate: (id) => {
      queryClient.setQueryData(['likes'], (oldLikes) => {
        return [
          ...oldLikes,
          {
            userId: user.id,
            id: new Date().getTime(),
            replyId: item.id,
            createdAt: new Date().getTime(),
          },
        ];
      });
      queryClient.setQueryData(['replies', item.id], (oldTawt) => {
        let newTawt = oldTawt;
        newTawt = {
          ...newTawt,
          ...(newTawt.likes + 1),
        };
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['likes'], { exact: true });
      queryClient.invalidateQueries(['replies', item?.id], { exact: true });
      queryClient.invalidateQueries(['reply', 'replies', reply?.id], {
        exact: true,
      });
    },
  });
  const unlikeMutation = useMutation({
    mutationFn: unlikeReply,
    onMutate: (id) => {
      queryClient.setQueryData(['likes'], (oldLikes) => {
        return oldLikes.filter(
          (liked) => parseInt(liked.replyId) !== parseInt(item.id)
        );
      });
      queryClient.setQueryData(['replies', item.id], (oldTawt) => {
        let newTawt = oldTawt;
        newTawt = {
          ...newTawt,
          ...(newTawt.likes - 1),
        };
      });
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['likes'], { exact: true });
      queryClient.invalidateQueries(['replies', item.id], { exact: true });
      queryClient.invalidateQueries(['reply', 'replies', reply?.id], {
        exact: true,
      });
    },
  });
  function onLike() {
    likeMutation.mutate(item.id);
  }

  function unLike() {
    unlikeMutation.mutate(item.id);
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
              navigation.navigate('Reply To Reply', {
                item,
                replyId: reply.id,
              })
            }
          />
        </View>
        <View className='flex flex-row'>
          {queryClient
            .getQueryData(['likes'])
            .find((liked) => parseInt(liked.replyId) === item.id) ? (
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

export default ReplyReplyActionsItem;
