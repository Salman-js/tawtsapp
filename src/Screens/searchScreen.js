import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import React, { useState } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { IconButton, Surface } from '@react-native-material/core';
import { SearchBar } from '@rneui/themed';
import PostItem from '../Components/postItem';
import Modal from 'react-native-modal';

const SearchScreen = () => {
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
        <SearchBar
          placeholder='Search'
          platform='ios'
          containerStyle={tw.style('p-0 bg-transparent', {
            width: '87%',
          })}
          showCancel={false}
          lightTheme={false}
          inputContainerStyle={tw.style('p-0 rounded-full pl-2 bg-slate-700')}
          inputStyle={tw.style('text-gray-300')}
          cancelButtonProps={{ style: tw.style('text-gray-300') }}
          onChangeText={(e) => setSearchString(e)}
          value={searchString}
        />
        <IconButton
          icon={(props) => (
            <Icon name='tune-variant' {...props} color='#ece9e9' />
          )}
          style={tw.style('')}
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
        swipeDirection={['down']}
        style={tw.style('justify-end m-0')}
      >
        <View className='h-49 w-full'></View>
      </Modal>
    </View>
  );
};

export default SearchScreen;
