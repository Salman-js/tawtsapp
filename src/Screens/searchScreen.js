import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import React, { useState } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import Material from '@expo/vector-icons/MaterialIcons';
import {
  Avatar,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import { SearchBar } from '@rneui/themed';
import PostItem from '../Components/postItem';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { getTawtsBySearch } from '../api/tawts';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { RefreshControl } from 'react-native';

const SearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const toast = useToast(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const searchedTawtsQuery = useQuery({
    queryKey: ['tawts', 'search', route.params && route.params.searchString],
    queryFn: () =>
      route.params && route.params.searchString
        ? getTawtsBySearch(route.params.searchString)
        : console.log(''),
    enabled:
      route.params && route.params.searchString.trim().length ? true : false,
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
  return (
    <View className='h-full flex justify-between items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-14 bg-transparent'
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
              <Avatar
                label={user?.name}
                size={38}
                style={tw.style('my-auto')}
              />
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
            value={
              route.params && route.params.searchString
                ? route.params.searchString
                : ''
            }
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
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2 pb-16')}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            progressBackgroundColor='#271b2d'
            colors={['white']}
            refreshing={searchedTawtsQuery.isInitialLoading}
            onRefresh={() => {
              searchedTawtsQuery.refetch();
            }}
          />
        }
      >
        {searchedTawtsQuery.data?.length ? (
          searchedTawtsQuery.data.map((tawt) => (
            <PostItem key={tawt.id} item={tawt} />
          ))
        ) : (
          <View className='m-auto flex items-center justify-center mt-12'>
            <Material name='bubble-chart' color='#ece9e9' size={80} />
            <Text className='text-xl text-slate-200 mt-2 text-center'>
              Nothing found
            </Text>
          </View>
        )}
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
