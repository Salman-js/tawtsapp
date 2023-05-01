import { View, Text, Dimensions, Image, ScrollView } from 'react-native';
import React from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
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
import CommentItem from '../Components/commentItem';

const PostScreen = ({ navigation }) => {
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-start p-4 pt-14 rounded-b-xl bg-transparent'
        )}
      >
        <IconButton
          icon={(props) => (
            <Feather name='chevron-left' {...props} color='#ebe5e5' size={30} />
          )}
          onPress={() => navigation.goBack()}
        />
        <Text className='text-2xl font-semibold text-slate-200 my-auto ml-3'>
          Tawt.
        </Text>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2')}
        showsVerticalScrollIndicator={false}
      >
        <Surface
          style={tw.style('w-full rounded-3xl overflow-hidden mb-2 p-4 pt-2', {
            backgroundColor: '#32283c',
          })}
          elevation={3}
        >
          <View className='w-full flex flex-row justify-between items-center'>
            <View className='overflow-hidden rounded-xl'>
              <Pressable
                style={tw.style('flex flex-row justify-start p-1')}
                onPress={() => navigation.navigate('User')}
              >
                <Avatar
                  image={{
                    uri: 'https://mui.com/static/images/avatar/1.jpg',
                  }}
                  size={35}
                />
                <View className='ml-2'>
                  <View className='flex flex-row space-x-1'>
                    <Text className='text-lg font-bold text-gray-200'>
                      Salman M.
                    </Text>
                    <Text
                      className='text-base text-gray-400 text-left'
                      numberOfLines={1}
                    >
                      @theartist
                    </Text>
                  </View>
                  <Text className='text-xs font-light text-gray-300'>
                    1 hour ago
                  </Text>
                </View>
              </Pressable>
            </View>
            <IconButton
              icon={(props) => (
                <Icon name='dots-horizontal' {...props} color='#ece9e9' />
              )}
              style={tw.style('')}
            />
          </View>
          <View className='w-full mt-2'>
            <Text className='text-sm text-gray-100 break-words'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat
              reiciendis architecto, fugit repudiandae cupiditate aliquid vitae
              quisquam veniam exercitationem omnis voluptatum explicabo
              voluptates!
            </Text>
            <View className='w-full flex flex-row justify-start space-x-2 mt-3'>
              <Pressable style={tw.style('my-auto')}>
                <Text className='text-base text-gray-100 break-words'>
                  150 <Text className='font-bold'> Bookmarks</Text>
                </Text>
              </Pressable>
              <Pressable style={tw.style('my-auto')}>
                <Text className='text-base text-gray-100 break-words'>
                  150 <Text className='font-bold'> Likes</Text>
                </Text>
              </Pressable>
            </View>
          </View>
          <View className='w-full flex flex-row justify-between mt-1'>
            <View className='flex flex-row justify-start space-x-2'>
              <View className='flex flex-row'>
                <IconButton
                  icon={(props) => (
                    <Ionicons
                      name='chatbubble-ellipses-outline'
                      {...props}
                      color='#ebe5e5'
                      size={24}
                    />
                  )}
                />
              </View>
              <View className='flex flex-row'>
                <IconButton
                  icon={(props) => (
                    <Ionicons
                      name='bookmark-outline'
                      {...props}
                      color='#ece9e9'
                      size={24}
                    />
                  )}
                />
              </View>
              <View className='flex flex-row'>
                <IconButton
                  icon={(props) => (
                    <Ionicons
                      name='heart-outline'
                      {...props}
                      color='#ebe5e5'
                      size={24}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </Surface>
        <View className='w-full rounded-3xl bg-[#32283c] p-4 mt-2'>
          <Text className='text-xl font-bold text-gray-200 pl-4 mb-2'>
            Replies
          </Text>
          <CommentItem />
          <CommentItem />
          <CommentItem />
        </View>
      </ScrollView>
    </View>
  );
};

export default PostScreen;
