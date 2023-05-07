import { View, Text } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { SearchBar } from '@rneui/themed';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import Material from '@expo/vector-icons/MaterialIcons';
import { Avatar, IconButton, Pressable } from '@react-native-material/core';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Surface } from 'react-native-paper';

const SearchTabBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, searchString } = useSelector((state) => state.auth);
  return (
    <Surface
      style={tw.style(
        'w-full flex flex-row justify-between p-4 pt-14 bg-transparent',
        {
          backgroundColor: '#271b2d',
        }
      )}
      elevation={1}
    >
      <View className='overflow-hidden rounded-full my-auto'>
        <Pressable onPress={() => navigation.openDrawer()}>
          {user?.avatar ? (
            <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={38}
              style={tw.style('my-auto')}
            />
          ) : (
            <Avatar label={user?.name} size={38} style={tw.style('my-auto')} />
          )}
        </Pressable>
      </View>
      <Pressable
        style={tw.style('p-0', {
          width: '75%',
        })}
        onPress={() =>
          navigation.navigate('Search Input', {
            searchString:
              route.params && route.params.searchString
                ? route.params.searchString
                : '',
          })
        }
      >
        <SearchBar
          placeholder='Search'
          platform='ios'
          containerStyle={tw.style('w-full p-0 bg-transparent')}
          showCancel={false}
          lightTheme={false}
          inputContainerStyle={tw.style('p-0 rounded-full pl-2 bg-slate-700')}
          inputStyle={tw.style('text-gray-300 h-12')}
          cancelButtonProps={{ style: tw.style('text-gray-300') }}
          disabled
          value={searchString}
        />
      </Pressable>
      <IconButton
        icon={(props) => (
          <Icon name='tune-variant' {...props} color='#ece9e9' />
        )}
        style={tw.style('my-auto')}
        onPress={() => setIsModalOpen(true)}
      />
    </Surface>
  );
};

export default SearchTabBar;
