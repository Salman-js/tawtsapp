import { View, Text, Dimensions, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Avatar,
  Chip,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import PostItem from '../Components/postItem';
import GroupItem from '../Components/groupItem';
import {
  getAllTopics,
  getTopicSuggestions,
  getTopicsFromInterest,
  getUserTopics,
} from '../api/tawts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { Button } from '@rneui/themed';
import { useSelector } from 'react-redux';

const SelectInterestsScreen = ({ navigation }) => {
  const toast = useToast(null);
  const { user } = useSelector((state) => state.auth);
  const interests = {
    names: [
      'sport',
      'art',
      'music',
      'tech',
      'gaming',
      'travel',
      'entertainment',
      'food',
      'fashion',
    ],
  };
  const [selectedInterests, setSelectedInterests] = useState([]);
  const interestMutation = useMutation({
    mutationFn: getTopicsFromInterest,
    onSuccess: (data) => {
      const groupedTopics = data.reduce((result, topic) => {
        const { interest, id, name } = topic;
        const foundInterest = result.find((item) => item.interest === interest);

        if (foundInterest) {
          foundInterest.topics.push({ id, name });
        } else {
          result.push({ interest, topics: [{ id, name }] });
        }
        return result;
      }, []);
      navigation.navigate('Select Topics', {
        data: groupedTopics,
      });
    },
    onError: (error) => {
      if (error.response) {
        if (error.response.data.token) {
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
  });
  function onSubmit() {
    const interestsData = {
      names: selectedInterests,
    };
    interestMutation.mutate(interestsData);
  }
  useEffect(() => {
    if (!user) {
      navigation.navigate('Intro');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Intro' }],
      });
    }
  }, [user]);
  return (
    <View className='h-full flex items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-14 bg-transparent'
        )}
        elevation={1}
      >
        <Text className='text-3xl font-bold text-slate-200 my-auto'>
          Interests
        </Text>
      </Surface>
      <View className='w-full'>
        <Text
          className='text-2xl text-gray-200 break-words p-4 pb-5'
          numberOfLines={2}
        >
          Select your interests
        </Text>
        <FlatList
          data={interests.names}
          renderItem={({ item, index }) => (
            <Surface
              style={tw.style(
                'border border-slate-400 rounded-2xl m-2 bg-transparent overflow-hidden',
                {
                  backgroundColor: selectedInterests.includes(item)
                    ? '#6792cb'
                    : '#ffffff00',
                  width: '45%',
                }
              )}
            >
              <Pressable
                style={tw.style('w-full p-3')}
                onPress={() => {
                  if (selectedInterests.includes(item)) {
                    setSelectedInterests(
                      selectedInterests.filter((interest) => interest !== item)
                    );
                  } else {
                    setSelectedInterests([...selectedInterests, item]);
                  }
                }}
              >
                <View className='w-full flex flex-row justify-end'>
                  <Ionicons
                    name='checkmark-circle'
                    size={25}
                    color={
                      selectedInterests.includes(item) ? '#ffffff' : '#ffffff00'
                    }
                  />
                </View>
                <Text className='mt-3 text-white font-semibold text-left text-xl'>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </Pressable>
            </Surface>
          )}
          keyExtractor={(item, index) => index}
          numColumns={2}
          contentContainerStyle={tw.style('pb-16')}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={tw.style('items-center')}
        />
      </View>
      <Surface
        style={tw.style(
          'w-full absolute bottom-0 flex flex-row px-3 py-4 justify-end bg-transparent'
        )}
        elevation={2}
      >
        <Button
          title='Next'
          loading={interestMutation.isLoading}
          buttonStyle={tw.style('rounded-full overflow-hidden px-4', {
            backgroundColor: '#4b3c59',
          })}
          disabledStyle={tw.style('', {
            backgroundColor: '#4b3c59',
          })}
          disabled={!selectedInterests.length}
          titleStyle={tw.style('font-bold text-xl')}
          onPress={onSubmit}
        />
      </Surface>
    </View>
  );
};

export default SelectInterestsScreen;
