import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Material from '@expo/vector-icons/MaterialIcons';
import tw from 'twrnc';
import { IconButton, Surface } from '@react-native-material/core';
import UserItem from '../Components/userItem';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getReplyLikes, getUserSuggestions } from '../api/tawts';
import { getMyFollowings } from '../api/user';
import { Button } from '@rneui/themed';

const UserSuggestionsScreen = ({ route }) => {
  const navigation = useNavigation();
  const myFollowingsQuery = useQuery({
    queryKey: ['followings'],
    queryFn: () => getMyFollowings(),
  });
  const { data, isLoading, refetch, isInitialLoading } = useQuery({
    queryKey: ['users', 'suggestions'],
    queryFn: () => getUserSuggestions(),
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
          'w-full flex flex-row justify-between p-4 pt-14 rounded-b-xl bg-transparent'
        )}
      >
        <IconButton
          icon={(props) => (
            <AntDesign name='arrowleft' {...props} color='#ece9e9' />
          )}
          style={tw.style('my-auto')}
          onPress={() => navigation.goBack()}
        />
        <Text className='text-2xl font-bold text-slate-200 my-auto'>
          Accounts you might like
        </Text>
      </Surface>
      <ScrollView
        className='w-full'
        contentContainerStyle={tw.style('bg-transparent p-2')}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isInitialLoading}
            onRefresh={() => {
              refetch();
            }}
          />
        }
      >
        {data?.length ? (
          data.map((user) => (
            <UserItem key={user.userId} item={user} type='likes' />
          ))
        ) : (
          <View className='m-auto flex items-center justify-center mt-12'>
            <Material name='bubble-chart' color='#ece9e9' size={80} />
            <Text className='text-xl text-slate-200 mt-2 text-center'>
              Nothing here...
            </Text>
          </View>
        )}
      </ScrollView>
      <Surface
        style={tw.style(
          'w-full absolute bottom-0 flex flex-row px-3 py-4 justify-end bg-transparent'
        )}
        elevation={2}
      >
        <Button
          title='Next'
          buttonStyle={tw.style('rounded-full overflow-hidden px-4', {
            backgroundColor: '#4b3c59',
          })}
          disabledStyle={tw.style('', {
            backgroundColor: '#4b3c59',
          })}
          titleStyle={tw.style('font-bold text-xl')}
          onPress={() => {
            navigation.navigate('Intro');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Intro' }],
            });
          }}
        />
      </Surface>
    </View>
  );
};

export default UserSuggestionsScreen;
