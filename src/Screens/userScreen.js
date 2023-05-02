import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import React, { useEffect, useRef } from 'react';
import {
  Avatar,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import PostItem from '../Components/postItem';

const UserScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  useEffect(() => {
    const scrollToTop = navigation.addListener('tabPress', (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
  }, []);
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pt-28')}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
      >
        <Surface
          style={tw.style('rounded-3xl p-3 mb-2', {
            backgroundColor: '#32283c',
          })}
          elevation={3}
        >
          <View className='w-full flex flex-row justify-start space-x-4'>
            <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={60}
              style={tw.style('my-auto')}
            />
            <View className='flex flex-row space-x-2'>
              <View className='rounded-xl bg-slate-600 overflow-hidden'>
                <Pressable
                  style={tw.style('flex justify-center items-center py-4 px-6')}
                >
                  <Text className='font-bold text-sm text-white'>250</Text>
                  <Text className='font-light text-xs text-gray-300'>
                    Tawts
                  </Text>
                </Pressable>
              </View>
              <View className='rounded-xl bg-slate-600 overflow-hidden'>
                <Pressable
                  style={tw.style('flex justify-center items-center py-4 px-6')}
                >
                  <Text className='font-bold text-sm text-white'>250</Text>
                  <Text className='font-light text-xs text-gray-300'>
                    Followers
                  </Text>
                </Pressable>
              </View>
              <View className='rounded-xl bg-slate-600 overflow-hidden'>
                <Pressable
                  style={tw.style('flex justify-center items-center py-4 px-6')}
                >
                  <Text className='font-bold text-sm text-white'>250</Text>
                  <Text className='font-light text-xs text-gray-300'>
                    Following
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View className='w-full flex justify-start pt-3'>
            <View className='w-full flex flex-row justify-between pr-3'>
              <View>
                <Text className='font-bold text-lg text-white'>Salman M.</Text>
                <Text className='text-sm text-gray-400 text-left'>
                  @theartist
                </Text>
              </View>
              <View className='w-1/4 overflow-hidden border border-slate-200 rounded-full my-auto'>
                <Pressable
                  style={tw.style(
                    'w-full py-1 px-2 flex justify-center items-center'
                  )}
                >
                  <Text className='text-sm text-slate-200 text-left'>
                    Follow
                  </Text>
                </Pressable>
              </View>
            </View>
            <Text className='text-sm text-gray-300 break-words text-left mt-3'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
              laborum voluptatibus aliquam et beatae blanditiis.
            </Text>
            <View className='w-full flex flex-row justify-start space-x-10 mt-3'>
              <View className='flex flex-row space-x-1'>
                <Ionicons
                  name='location-outline'
                  color='#6d829f'
                  size={15}
                  style={tw.style('my-auto')}
                />
                <Text className='text-sm text-gray-300 break-words text-left'>
                  Addis Ababa
                </Text>
              </View>
              <View className='flex flex-row space-x-1'>
                <AntDesign
                  name='link'
                  color='#6d829f'
                  size={15}
                  style={tw.style('my-auto')}
                />
                <Text className='text-sm text-blue-300 break-words text-left'>
                  salman.dev.et
                </Text>
              </View>
            </View>
          </View>
        </Surface>
        <PostItem />
        <PostItem />
        <PostItem />
      </ScrollView>
      <View className='absolute top-12 w-full flex flex-row justify-between px-4'>
        <IconButton
          icon={(props) => (
            <Icon name='chevron-left' {...props} color='#ece9e9' />
          )}
          style={tw.style('bg-black bg-opacity-25')}
          onPress={() => navigation.goBack()}
        />
        <IconButton
          icon={(props) => (
            <Icon name='dots-vertical' {...props} color='#ece9e9' />
          )}
          style={tw.style('bg-black bg-opacity-25')}
        />
      </View>
    </View>
  );
};

export default UserScreen;
