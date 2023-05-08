import { View, Text } from 'react-native';
import tw from 'twrnc';
import React from 'react';
import { Avatar, Pressable } from '@react-native-material/core';

const ReplyNotificationItem = ({ item }) => {
  return (
    <View className='rounded-2xl w-full overflow-hidden bg-[#32283c] mb-2'>
      <Pressable style={tw.style('w-full p-3 flex flex-row')}>
        <Avatar
          image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
          size={33}
          style={tw.style('')}
        />
        <View className='ml-2'>
          <Text className='text-base text-gray-100 break-words'>
            <Text className='font-bold'>Jhon Doe </Text>
            replied to your tawt.
          </Text>
          <Text className='text-xs font-light text-gray-300'>1 hour ago</Text>
          <View className='mt-4 w-5/6'>
            <Text className='text-sm text-slate-200 w-full break-words'>
              This is the first reply
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ReplyNotificationItem;
