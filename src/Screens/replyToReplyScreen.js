import { View, Text, Dimensions, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import tw from 'twrnc';
import {
  ActivityIndicator,
  Avatar,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import PostItem from '../Components/postItem';
import { Input } from '@rneui/themed';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { replyToReply, replyToTawt } from '../api/tawts';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import CommentItem from '../Components/commentItem';

const ReplyToReplyScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const [body, setBody] = useState('');
  const { item, postId } = route.params;
  const toast = useToast(null);
  const queryClient = useQueryClient();
  const replyMutation = useMutation({
    mutationFn: replyToReply,
    onSuccess: () => {
      queryClient.invalidateQueries(['replies', postId], { exact: true });
      navigation.goBack();
      toast.show('Reply posted', {
        icon: <Feather name='check-circle' size={20} color='white' />,
        placement: 'top',
        type: 'normal',
        duration: 4000,
        style: { marginTop: 50 },
        textStyle: { padding: 0 },
      });
    },
    onError: (error) => {
      if (error.response) {
        if (error.response.data.token) {
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
  function onReply() {
    const replyData = {
      body,
      replyId: item.id,
      postId,
    };
    replyMutation.mutate(replyData);
  }
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-start p-4 rounded-b-xl bg-transparent'
        )}
      >
        <IconButton
          icon={(props) => (
            <Feather name='chevron-left' {...props} color='#ebe5e5' size={30} />
          )}
          onPress={() => navigation.goBack()}
        />
        <Text className='text-2xl font-semibold text-slate-200 my-auto ml-3'>
          Reply
        </Text>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pb-16')}
        showsVerticalScrollIndicator={false}
      >
        <CommentItem item={item} />
        <View className='w-full p-4 bg-[#32283c] rounded-3xl'>
          <Surface
            style={tw.style(
              'w-full bg-transparent flex flex-row justify-start'
            )}
          >
            {user?.avatar ? (
              <Avatar
                image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
                size={40}
                style={tw.style('my-auto')}
              />
            ) : (
              <Avatar
                label={user?.name}
                size={40}
                style={tw.style('my-auto')}
              />
            )}
            <View className='flex flex-col ml-2'>
              <Text className='font-bold text-lg text-white'>{user?.name}</Text>
              <Text className='text-sm text-gray-400 text-left'>
                @{user?.handle} replying to @{item.userHandle}
              </Text>
            </View>
          </Surface>
          <Input
            placeholder={`What's on your mind`}
            multiline
            numberOfLines={5}
            inputStyle={tw.style('text-gray-200', {
              textAlignVertical: 'top',
            })}
            value={body}
            onChangeText={(e) => setBody(e)}
            inputContainerStyle={tw.style('mt-4', {
              borderBottomWidth: 0,
            })}
          />
          <View className='w-full flex flex-row justify-end'>
            {replyMutation.isLoading ? (
              <ActivityIndicator color='white' size='large' />
            ) : (
              <IconButton
                icon={(props) => (
                  <Ionicons
                    name='ios-paper-plane'
                    {...props}
                    color='#ebe5e5'
                    size={30}
                  />
                )}
                style={tw.style('')}
                onPress={onReply}
                disabled={!body.trim().length}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReplyToReplyScreen;
