import { View, Text } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import Material from '@expo/vector-icons/MaterialIcons';
import { useQuery } from '@tanstack/react-query';
import { getTawtsBySearch } from '../api/tawts';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';
import SearchPostItem from '../Components/Post Items/searchPostItem';

const PostsSearchTab = () => {
  const navigation = useNavigation();
  const toast = useToast(null);
  const { user, searchString } = useSelector((state) => state.auth);
  const searchedTawtsQuery = useQuery({
    queryKey: ['tawts', 'search', searchString],
    queryFn: () =>
      searchString.trim().length
        ? getTawtsBySearch(searchString)
        : console.log(''),
    enabled: searchString.trim().length ? true : false,
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
            <SearchPostItem
              key={tawt.id}
              item={tawt}
              searchString={searchString}
            />
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
    </View>
  );
};

export default PostsSearchTab;
