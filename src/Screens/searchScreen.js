import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import React, { useState } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {
  Avatar,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import { SearchBar } from '@rneui/themed';
import PostItem from '../Components/postItem';
import Modal from 'react-native-modal';

const SearchScreen = ({ navigation }) => {
  const [searchString, setSearchString] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-14 rounded-b-xl bg-transparent'
        )}
        elevation={3}
      >
        <View className='overflow-hidden rounded-full my-auto'>
          <Pressable onPress={() => navigation.openDrawer()}>
            <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={38}
              style={tw.style('my-auto')}
            />
          </Pressable>
        </View>
        <SearchBar
          placeholder='Search'
          platform='ios'
          containerStyle={tw.style('p-0 bg-transparent', {
            width: '76%',
          })}
          showCancel={false}
          lightTheme={false}
          inputContainerStyle={tw.style('p-0 rounded-full pl-2 bg-slate-700')}
          inputStyle={tw.style('text-gray-300 h-12')}
          cancelButtonProps={{ style: tw.style('text-gray-300') }}
          onChangeText={(e) => setSearchString(e)}
          value={searchString}
        />
        <IconButton
          icon={(props) => (
            <Icon name='tune-variant' {...props} color='#ece9e9' />
          )}
          style={tw.style('my-auto')}
          onPress={() => setIsModalOpen(true)}
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
      <Modal
        isVisible={isModalOpen}
        onSwipeComplete={() => setIsModalOpen(false)}
        onBackdropPress={() => setIsModalOpen(false)}
        swipeDirection={['down']}
        style={tw.style('justify-end m-0')}
        animationInTiming={300}
        animationOutTiming={300}
        backdropOpacity={0.5}
        backdropColor='#32283c'
      >
        <View className='h-40 w-full bg-[#271b2d] rounded-3xl p-3'>
          <View className='w-10 bg-slate-500 h-[6] rounded-full mx-auto'></View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchScreen;
