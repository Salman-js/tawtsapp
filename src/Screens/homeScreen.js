import { View, Text, Dimensions, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import { Avatar, Pressable, Surface } from '@react-native-material/core';
import PostItem from '../Components/postItem';
import { FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const scrollToTop = navigation.addListener('tabPress', (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
  }, []);
  useEffect(() => {
    if (!user) {
      navigation.navigate('Intro');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Intro' }],
      });
    }
  }, [user]);
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-14 bg-transparent'
        )}
        elevation={1}
      >
        <View className='overflow-hidden rounded-full'>
          <Pressable onPress={() => navigation.openDrawer()}>
            <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={38}
              style={tw.style('my-auto')}
            />
          </Pressable>
        </View>
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
        bounces
        alwaysBounceVertical
      >
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </ScrollView>
      <View className='absolute bottom-16 right-3 p-4 flex items-center justify-center'>
        <FAB
          icon='plus'
          style={tw.style('text-white rounded-full', {
            backgroundColor: '#4b3c59',
          })}
          onPress={() => navigation.navigate('New Post')}
          color='white'
        />
      </View>
    </View>
  );
};

export default HomeScreen;
