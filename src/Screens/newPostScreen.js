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
import { FAB } from 'react-native-paper';
import { Input } from '@rneui/themed';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTawt } from '../api/tawts';
import { useToast } from 'react-native-toast-notifications';

const NewPostScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const [body, setBody] = useState('');
  const toast = useToast(null);
  const queryClient = useQueryClient();
  const postTawtMutation = useMutation({
    mutationFn: postTawt,
    onSuccess: () => {
      queryClient.invalidateQueries(['tawts'], { exact: true });
      queryClient.invalidateQueries(['tawts', 'my'], { exact: true });
      navigation.goBack();
      toast.show('Posted', {
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
  function onPost() {
    const postData = {
      body,
    };
    postTawtMutation.mutate(postData);
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
          Create Post
        </Text>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pb-16')}
        showsVerticalScrollIndicator={false}
      >
        <Surface
          style={tw.style(
            'w-full rounded-3xl flex flex-row justify-start p-4',
            {
              backgroundColor: '#32283c',
            }
          )}
          elevation={3}
        >
          {user?.avatar ? (
            <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={40}
              style={tw.style('my-auto')}
            />
          ) : (
            <Avatar label={user?.name} size={40} style={tw.style('my-auto')} />
          )}
          <View className='flex flex-col ml-2'>
            <Text className='font-bold text-lg text-white'>{user?.name}</Text>
            <Text className='text-sm text-gray-400 text-left'>
              @{user?.handle}
            </Text>
          </View>
        </Surface>
        <View className='w-full p-4 bg-[#32283c] mt-4 rounded-3xl'>
          <Input
            placeholder={`What's on your mind`}
            multiline
            numberOfLines={5}
            inputStyle={tw.style('text-gray-200', {
              textAlignVertical: 'top',
            })}
            value={body}
            onChangeText={(e) => setBody(e)}
            inputContainerStyle={tw.style('', {
              borderBottomWidth: 0,
            })}
          />
          <View className='w-full flex flex-row justify-between'>
            <IconButton
              icon={(props) => (
                <Ionicons name='attach' {...props} color='#ebe5e5' size={30} />
              )}
              style={tw.style('')}
              onPress={() => navigation.goBack()}
            />
            {postTawtMutation.isLoading ? (
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
                onPress={onPost}
                disabled={!body.trim().length}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewPostScreen;
