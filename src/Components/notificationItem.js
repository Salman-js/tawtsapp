import { View, Text } from 'react-native';
import tw from 'twrnc';
import React from 'react';
import { Avatar, Pressable } from '@react-native-material/core';

const NotificationItem = ({ type }) => {
  const types = {
    like: 'liked',
    comment: 'commented on',
    retweet: 'retweeted',
  };
  return (
    <View className='rounded-2xl w-full overflow-hidden bg-[#32283c] mb-2'>
      <Pressable style={tw.style('w-full p-3 flex flex-row')}>
        <Avatar
          image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
          size={33}
          style={tw.style('my-auto')}
        />
        <View className='space-y-1 ml-2'>
          {type !== 'follow' ? (
            <Text className='text-base text-gray-100 break-words'>
              <Text className='font-bold'>Jhon Doe</Text>{' '}
              {type === 'like'
                ? types.like
                : type === 'comment'
                ? types.comment
                : type === 'retweet'
                ? types.retweet
                : ''}{' '}
              your tawt.
            </Text>
          ) : (
            <Text className='text-sm text-gray-100 break-words'>
              <Text className='font-bold'>Jhon Doe</Text> started following you
            </Text>
          )}
          <Text className='text-xs font-light text-gray-300'>1 hour ago</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default NotificationItem;
