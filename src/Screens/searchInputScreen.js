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
import { useDispatch, useSelector } from 'react-redux';
import { getTawtsBySearch } from '../api/tawts';
import { useRoute } from '@react-navigation/native';
import { setSearch } from '../../slices/authSlice';

const SearchInputScreen = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState(
    route.params && route.params.searchString ? route.params.searchString : ''
  );
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-14 bg-transparent'
        )}
        elevation={1}
      >
        <IconButton
          icon={(props) => (
            <Icon name='arrow-left' {...props} color='#ece9e9' />
          )}
          style={tw.style('my-auto')}
          onPress={() => navigation.goBack()}
        />
        <Pressable
          style={tw.style('p-0')}
          onPress={() => navigation.navigate('Search Input')}
        >
          <SearchBar
            placeholder='Search'
            platform='ios'
            containerStyle={tw.style('p-0 bg-transparent', {
              width: '90%',
            })}
            showCancel={false}
            lightTheme={false}
            autoFocus
            onSubmitEditing={() => {
              dispatch(setSearch(searchString));
              navigation.navigate('Search');
            }}
            inputContainerStyle={tw.style('p-0 pl-2 bg-transparent')}
            inputStyle={tw.style('text-gray-300 h-12')}
            cancelButtonProps={{ style: tw.style('hidden') }}
            onChangeText={(e) => setSearchString(e)}
            value={searchString}
          />
        </Pressable>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pb-16')}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
    </View>
  );
};

export default SearchInputScreen;
