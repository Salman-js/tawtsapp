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
import ago from 's-ago';
import { useNavigation } from '@react-navigation/native';

const CommentItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Surface
      style={tw.style('rounded-3xl overflow-hidden mb-2 w-full p-4 pt-2', {
        backgroundColor: '#32283c',
      })}
    >
      <View className='w-full flex flex-row justify-between items-center'>
        <View className='overflow-hidden rounded-xl'>
          <Pressable
            style={tw.style('flex flex-row justify-start p-1')}
            onPress={() => navigation.navigate('User')}
          >
            {item.userAvatar ? (
              <Avatar
                image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
                size={24}
                style={tw.style('my-auto')}
              />
            ) : (
              <Avatar
                label={item.userName}
                size={24}
                style={tw.style('my-auto')}
              />
            )}
            <View className='ml-2'>
              <View className='flex flex-row space-x-1'>
                <Text className='text-sm font-bold text-gray-200'>
                  {item.userName}
                </Text>
                <Text
                  className='text-xs text-gray-400 text-left'
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
      <View className='w-full flex flex-row justify-between mt-3'>
        <View className='flex flex-row justify-start space-x-2'>
          <View className='flex flex-row'>
            <View className='rounded-full flex justify-center items-center overflow-hidden'>
              <Pressable style={tw.style('w-full p-2 flex-row')}>
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
              <Pressable style={tw.style('w-full p-2 flex flex-row')}>
                <Ionicons name='heart-outline' color='#ece9e9' size={24} />
                <Text className='text-xs text-gray-100 break-words my-auto ml-1'>
                  {item.likes}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Surface>
  );
};

export default CommentItem;
