import { View, Text, Dimensions, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import { Avatar, Surface } from '@react-native-material/core';
import PostItem from '../Components/postItem';

const HomeScreen = () => {
  return (
    <View className='h-full flex justify-between items-center bg-regal-darker w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-6 pt-14 rounded-b-xl bg-transparent'
        )}
        elevation={3}
      >
        <Text className='text-3xl font-bold text-slate-400 my-auto'>
          Tawts.
        </Text>
        <Avatar
          image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
          size={38}
        />
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pb-16')}
        showsVerticalScrollIndicator={false}
      >
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
