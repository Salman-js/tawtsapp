import { View, Text } from 'react-native';
import tw from 'twrnc';
import React from 'react';
import { Avatar, Pressable } from '@react-native-material/core';
import { useSelector } from 'react-redux';

const ReplyNotificationItem = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <View className='rounded-2xl w-full overflow-hidden bg-[#32283c] mb-2'>
      <Pressable style={tw.style('w-full p-3 flex flex-row')}>
        <Avatar
          image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
          size={33}
          style={tw.style('')}
        />
        <View className='ml-2'>
          <View
            className={
              item.createdAt > user?.lastNotificationCheckTime
                ? 'flex flex-row justify-between w-5/6'
                : 'flex flex-row justify-between w-full'
            }
          >
            <Text className='text-base text-gray-100 break-words'>
              <Text className='font-bold'>{item.userName}</Text>
              replied to your tawt.
            </Text>
            {item.createdAt > user?.lastNotificationCheckTime && (
              <Text className='text-base text-gray-800 rounded-full px-2 bg-slate-200'>
                New
              </Text>
            )}
          </View>
          <Text className='text-xs font-light text-gray-300'>1 hour ago</Text>
          <View className='mt-4 w-5/6'>
            <Text className='text-sm text-slate-200 w-full break-words'>
              {item.reply}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ReplyNotificationItem;
