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
import { getTopicSuggestions, getUserTopics } from '../api/tawts';
import { useQuery } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';

const TopicsScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const toast = useToast(null);
  const followingTopics = useQuery({
    queryKey: ['topics'],
    queryFn: () => getUserTopics(),
    onError: (error) => {
      console.log('Request: ', error.request);
      console.log('Response: ', error.response);
      if (error.response) {
        if (error.response?.data.token) {
          toast.show('Session expired, Login required', {
            icon: <Feather name='alert-circle' size={20} color='white' />,
            placement: 'bottom',
            type: 'danger',
            duration: 4000,
            style: { marginBottom: 50 },
            textStyle: { padding: 0 },
          });
        }
        if (error.response.data.unknown) {
          toast.show('Server error. Please, try again', {
            icon: <Feather name='alert-circle' size={20} color='white' />,
            placement: 'bottom',
            type: 'danger',
            duration: 4000,
            style: { marginBottom: 50 },
            textStyle: { padding: 0 },
          });
        }
      } else if (error.request) {
        toast.show('Error connecting to the server', {
          icon: <Feather name='alert-circle' size={20} color='white' />,
          placement: 'bottom',
          type: 'danger',
          duration: 4000,
          style: { marginBottom: 50 },
          textStyle: { padding: 0 },
        });
      } else {
        toast.show('Unknown Error. Please, try again', {
          icon: <Feather name='alert-circle' size={20} color='white' />,
          placement: 'bottom',
          type: 'danger',
          duration: 4000,
          style: { marginBottom: 50 },
          textStyle: { padding: 0 },
        });
      }
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const suggestedTopics = useQuery({
    queryKey: ['suggestions'],
    queryFn: () => getTopicSuggestions(),
    onSuccess: (data) => {
      console.log(data);
    },
  });
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
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
        >
          {followingTopics.data && (
            <FlatList
              data={followingTopics.data}
              renderItem={({ item, index }) => (
                <Chip
                  label={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
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
                        name='close'
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
              key={followingTopics.data.length}
              numColumns={followingTopics.data.length / 3}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              directionalLockEnabled
              alwaysBounceHorizontal={false}
            />
          )}
        </ScrollView>
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
          {suggestedTopics.data && (
            <FlatList
              data={suggestedTopics.data}
              renderItem={({ item, index }) => (
                <Chip
                  label={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
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
              key={suggestedTopics.data.length}
              numColumns={suggestedTopics.data.length / 3}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              directionalLockEnabled
              alwaysBounceHorizontal={false}
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default TopicsScreen;
