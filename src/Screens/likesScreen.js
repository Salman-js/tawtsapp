import { View, Text, Dimensions, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import tw from 'twrnc';
import {
  Avatar,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import PostItem from '../Components/postItem';
import UserItem from '../Components/userItem';

const LikesScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  useEffect(() => {
    const scrollToTop = navigation.addListener('tabPress', (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
  }, []);
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 rounded-b-xl bg-transparent'
        )}
      >
        <IconButton
          icon={(props) => (
            <AntDesign name='arrowleft' {...props} color='#ece9e9' />
          )}
          style={tw.style('my-auto')}
          onPress={() => navigation.goBack()}
        />
        <Text className='text-2xl font-bold text-slate-200 my-auto'>Likes</Text>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2')}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
      >
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
      </ScrollView>
    </View>
  );
};

export default LikesScreen;
