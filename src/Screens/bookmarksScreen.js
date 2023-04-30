import { View, Text, Dimensions, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import { Avatar, Pressable, Surface } from '@react-native-material/core';
import PostItem from '../Components/postItem';

const BookmarksScreen = ({ navigation }) => {
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
          'w-full flex flex-row justify-between p-4 pt-14 rounded-b-xl bg-transparent'
        )}
        elevation={3}
      >
        <Text className='text-3xl font-bold text-slate-400 my-auto'>
          Bookmarks
        </Text>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2')}
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

export default BookmarksScreen;
