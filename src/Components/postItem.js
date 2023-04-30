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
import AntDesign from '@expo/vector-icons/AntDesign';

const PostItem = () => {
  return (
    <Surface
      style={tw.style('rounded-3xl overflow-hidden mb-2', {
        backgroundColor: '#202427',
      })}
      elevation={3}
    >
      <Pressable style={tw.style('w-full p-4 pt-2')}>
        <View className='w-full flex flex-row justify-between items-center'>
          <View className='overflow-hidden rounded-xl'>
            <Pressable style={tw.style('flex flex-row justify-start p-1')}>
              <Avatar
                image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
                size={30}
              />
              <View className='ml-2'>
                <Text className='font-bold text-gray-200'>Salman M.</Text>
                <Text className='text-xs font-light text-gray-300'>
                  1 hour ago
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
          <Text className='text-xs text-gray-100 break-words'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat
            reiciendis architecto, fugit repudiandae cupiditate aliquid vitae
            quisquam veniam exercitationem omnis voluptatum explicabo
            voluptates!
          </Text>
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
                    150
                  </Text>
                </Pressable>
              </View>
            </View>
            <View className='flex flex-row'>
              <View className='rounded-full flex justify-center items-center overflow-hidden'>
                <Pressable style={tw.style('w-full p-2 flex-row')}>
                  <AntDesign name='retweet' color='#ece9e9' size={24} />
                  <Text className='text-xs text-gray-100 break-words my-auto ml-2'>
                    150
                  </Text>
                </Pressable>
              </View>
            </View>
            <View className='flex flex-row'>
              <View className='rounded-full flex justify-center items-center overflow-hidden'>
                <Pressable style={tw.style('w-full p-2 flex flex-row')}>
                  <Ionicons name='heart-outline' color='#ece9e9' size={24} />
                  <Text className='text-xs text-gray-100 break-words my-auto ml-1'>
                    150
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <IconButton
            icon={(props) => (
              <Icon name='bookmark-outline' {...props} color='#ece9e9' />
            )}
            style={tw.style('')}
          />
        </View>
      </Pressable>
    </Surface>
  );
};

export default PostItem;
