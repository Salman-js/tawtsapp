import React from 'react';
import tw from 'twrnc';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Surface, Pressable, Avatar } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';

export default function CustomDrawer(props) {
  const navigation = useNavigation();
  return (
    <View className='flex-1 bg-[#271b2d] pt-14'>
      <View className='w-full px-6'>
        <Pressable
          style={tw.style('w-full border-b border-gray-400 pb-4')}
          onPress={() => navigation.navigate('Profile')}
        >
          <Avatar
            image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
            size={38}
            style={tw.style('my-auto')}
          />
          <View className='w-full flex justify-start pt-3'>
            <Text className='font-bold text-lg text-white'>Salman M.</Text>
            <Text className='text-sm text-gray-400 text-left'>@theartist</Text>
            <View className='mt-4 flex flex-row space-x-3'>
              <Text className='text-sm text-gray-200 text-left'>
                250 <Text className='font-bold'>Followers</Text>
              </Text>
              <Text className='text-sm text-gray-200 text-left'>
                250 <Text className='font-bold'>Following</Text>
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={tw.style('-mt-4', {
          backgroundColor: '#271b2d',
        })}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className='w-full px-6'>
        <View className='flex-col items-center py-3 border-t border-gray-400 bg-[#271b2d]'>
          <Pressable
            style={tw`w-full flex-row p-4 pl-0`}
            onPress={() => navigation.navigate('Settings')}
          >
            <Icon
              name='settings-outline'
              size={28}
              style={tw``}
              {...props}
              color='#e4dddd'
            />
            <Text style={tw`text-gray-200 w-full ml-3 mt-1`} variant='body1'>
              Settings and privacy
            </Text>
          </Pressable>
          <Pressable
            style={tw`w-full flex-row p-4 pl-0`}
            onPress={() => navigation.navigate('Main')}
          >
            <Icon name='exit-outline' size={28} style={tw``} color='#f25959' />
            <Text style={tw`text-red-500 w-full ml-3 mt-1`} variant='body1'>
              Logout
            </Text>
          </Pressable>
        </View>

        <View className='flex-row justify-end border-t border-gray-500 bg-[#271b2d]'>
          <Pressable
            style={tw`px-4 py-2`}
            onPress={() => navigation.navigate('Main')}
          >
            <Icon
              name='share-social-sharp'
              size={24}
              style={tw``}
              {...props}
              color='#edcce0c6'
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
