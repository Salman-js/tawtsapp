import { View, Text, Dimensions, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import { Avatar, Pressable, Surface } from '@react-native-material/core';
import PostItem from '../Components/postItem';

const HomeScreen = ({ navigation }) => {
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
          'w-full flex flex-row justify-between pb-4 pt-14 px-5 rounded-b-xl bg-transparent'
        )}
        elevation={3}
      >
        <Avatar
          image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
          size={38}
          style={tw.style('my-auto')}
        />
        <Pressable
          onPress={() =>
            scrollView.current.scrollTo({ x: 5, y: 5, animated: true })
          }
          style={tw.style('my-auto')}
        >
          <Image
            source={require('../../assets/logo.png')}
            className='w-8 h-8'
          />
        </Pressable>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pb-16')}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
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
