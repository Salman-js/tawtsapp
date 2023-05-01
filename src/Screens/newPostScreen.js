import { View, Text, Dimensions, Image, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import tw from 'twrnc';
import {
  Avatar,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import PostItem from '../Components/postItem';
import { FAB } from 'react-native-paper';
import { Input } from '@rneui/themed';

const NewPostScreen = ({ navigation }) => {
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-start p-4 rounded-b-xl bg-transparent'
        )}
      >
        <IconButton
          icon={(props) => (
            <Feather name='chevron-left' {...props} color='#ebe5e5' size={30} />
          )}
          onPress={() => navigation.goBack()}
        />
        <Text className='text-2xl font-semibold text-slate-200 my-auto ml-3'>
          Create Post
        </Text>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pb-16')}
        showsVerticalScrollIndicator={false}
      >
        <Surface
          style={tw.style(
            'w-full rounded-3xl flex flex-row justify-start p-4',
            {
              backgroundColor: '#32283c',
            }
          )}
          elevation={3}
        >
          <Avatar
            image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
            size={40}
            style={tw.style('my-auto')}
          />
          <View className='flex flex-col ml-2'>
            <Text className='font-bold text-lg text-white'>Salman M.</Text>
            <Text className='text-sm text-gray-400 text-left'>@theartist</Text>
          </View>
        </Surface>
        <View className='w-full p-4 bg-[#32283c] mt-4 rounded-3xl'>
          <Input
            placeholder={`What's on your mind`}
            multiline
            numberOfLines={5}
            inputStyle={tw.style('text-gray-200', {
              textAlignVertical: 'top',
            })}
            inputContainerStyle={tw.style('', {
              borderBottomWidth: 0,
            })}
          />
          <View className='w-full flex flex-row justify-between'>
            <IconButton
              icon={(props) => (
                <Ionicons name='attach' {...props} color='#ebe5e5' size={30} />
              )}
              style={tw.style('')}
              onPress={() => navigation.goBack()}
            />
            <IconButton
              icon={(props) => (
                <Ionicons
                  name='ios-paper-plane'
                  {...props}
                  color='#ebe5e5'
                  size={30}
                />
              )}
              style={tw.style('')}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewPostScreen;
