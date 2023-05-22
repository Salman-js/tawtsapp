import { View, Text, Dimensions, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {
  Avatar,
  Chip,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import PostItem from '../Components/postItem';
import GroupItem from '../Components/groupItem';

const TopicsScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  useEffect(() => {
    const scrollToTop = navigation.addListener('tabPress', (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
  }, []);
  return (
    <View className='h-full flex items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-14 bg-transparent'
        )}
        elevation={1}
      >
        <Text className='text-3xl font-bold text-slate-200 my-auto'>
          Topics
        </Text>
      </Surface>
      <View className='w-full'>
        <Text
          className='text-2xl font-bold text-gray-200 break-words p-4 pb-5'
          numberOfLines={2}
        >
          Following
        </Text>
        <ScrollView
          className='w-full'
          showsHorizontalScrollIndicator={false}
          horizontal
          alwaysBounceHorizontal
          ref={scrollView}
        ></ScrollView>
      </View>
      <View className='w-full'>
        <Text
          className='text-2xl font-bold text-gray-200 break-words p-4 mt-2 pb-5'
          numberOfLines={2}
        >
          Suggested
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
        >
          <FlatList
            data={[...Array(60).keys()]}
            renderItem={({ item, index }) => (
              <Chip
                label='Salman'
                style={tw.style('m-1 bg-transparent border border-slate-500')}
                labelStyle={tw.style('text-slate-300 text-base my-auto')}
                contentContainerStyle={tw.style(
                  'my-auto flex items-center justify-center'
                )}
                trailing={(props) => (
                  <Pressable
                    style={tw.style('', {
                      marginTop: -3,
                    })}
                  >
                    <Icon
                      name='plus'
                      {...props}
                      color='#c3bcbc'
                      size={23}
                      style={tw.style('my-auto')}
                    />
                  </Pressable>
                )}
                trailingContainerStyle={tw.style(
                  'border-l border-slate-500 pl-1 my-2'
                )}
              />
            )}
            keyExtractor={(item, index) => index}
            ref={scrollView}
            contentContainerStyle={tw.style('self-start')}
            scrollEnabled
            numColumns={20}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled
            alwaysBounceHorizontal={false}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default TopicsScreen;
