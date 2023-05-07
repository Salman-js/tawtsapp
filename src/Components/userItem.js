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
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import FollowItem from './followItem';

const UserItem = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  return (
    <Surface
      style={tw.style('rounded-3xl overflow-hidden mb-2', {
        backgroundColor: '#32283c',
      })}
      elevation={3}
    >
      <Pressable
        style={tw.style('w-full p-4 pt-2')}
        onPress={() => navigation.navigate('User')}
      >
        <View className='w-full flex flex-row space-x-1'>
          {item.userAvatar ? (
            <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={34}
            />
          ) : (
            <Avatar label={item.userName} size={34} />
          )}
          <View className='w-11/12 flex flex-col justify-between pr-3 pl-2'>
            <View className='w-full flex flex-row justify-between'>
              <View>
                <Text className='font-bold text-base text-white'>
                  {item.userName}
                </Text>
                <Text className='text-sm text-gray-400 text-left'>
                  @{item.userHandle}
                </Text>
              </View>
              <FollowItem id={item.userId} name={item.userName} />
            </View>
            {item.userBio && (
              <Text className='text-sm text-gray-300 break-words text-left mt-2'>
                {item.userBio}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </Surface>
  );
};

export default UserItem;
