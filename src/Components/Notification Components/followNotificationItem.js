import { View, Text } from 'react-native';
import tw from 'twrnc';
import React from 'react';
import { Avatar, Pressable, Surface } from '@react-native-material/core';
import FollowItem from '../followItem';
import { useNavigation } from '@react-navigation/native';

const FollowNotificationItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View className='rounded-2xl w-full overflow-hidden bg-[#32283c] mb-2'>
      <Pressable
        style={tw.style('w-full p-4 flex flex-row')}
        onPress={() =>
          navigation.navigate('User', {
            userItem: {
              ...item,
              id: item.userId,
            },
          })
        }
      >
        <Avatar
          image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
          size={33}
          style={tw.style('')}
        />
        <View className='w-11/12 pr-3 ml-2'>
          <Text className='text-base text-gray-100 break-words'>
            <Text className='font-bold'>{item.userName}</Text>
            started following you.
          </Text>
          <Text className='text-xs font-light text-gray-300'>1 hour ago</Text>
          <Surface
            style={tw.style('w-full rounded-3xl p-3 mt-2', {
              backgroundColor: '#271b2d',
            })}
          >
            <View className='flex flex-row justify-between pr-2'>
              <View>
                <Avatar
                  image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
                  size={35}
                  style={tw.style('my-auto')}
                />
                <View className='flex flex-row justify-between pr-3'>
                  <View>
                    <Text className='text-base text-gray-100 font-bold'>
                      {item.userName}.
                    </Text>
                    <Text className='text-sm text-gray-400 text-left'>
                      @{item.userHandle}
                    </Text>
                  </View>
                </View>
              </View>
              <FollowItem id={item.userId} name={item.userName} />
            </View>
            <Text className='text-sm text-gray-300 break-words text-left mt-3'>
              {item.userBio}
            </Text>
          </Surface>
        </View>
      </Pressable>
    </View>
  );
};

export default FollowNotificationItem;
