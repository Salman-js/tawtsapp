import React from 'react';
import tw from 'twrnc';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Pressable, Avatar } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { getProfile } from '../../api/auth';
import { useQuery } from '@tanstack/react-query';

export default function CustomDrawer(props) {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
  });
  return (
    <View className='flex-1 bg-[#271b2d] pt-14'>
      <View className='w-full px-6'>
        <Pressable
          style={tw.style('w-full border-b border-gray-400 pb-4')}
          onPress={() => navigation.navigate('Profile')}
        >
          {data?.avatar ? (
            <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={38}
              style={tw.style('my-auto')}
            />
          ) : (
            <Avatar label={user?.name} size={38} style={tw.style('my-auto')} />
          )}
          <View className='w-full flex justify-start pt-3'>
            <Text className='font-bold text-lg text-white'>{user?.name}</Text>
            <Text className='text-sm text-gray-400 text-left'>
              @{user?.handle}
            </Text>
            <View className='mt-4 flex flex-row space-x-3'>
              <Text className='text-sm text-gray-200 text-left'>
                {data?.followers} <Text className='font-bold'>Followers</Text>
              </Text>
              <Text className='text-sm text-gray-200 text-left'>
                {data?.following} <Text className='font-bold'>Following</Text>
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={tw.style('-mt-4', {
          backgroundColor: '#271b2d',
        })}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}
