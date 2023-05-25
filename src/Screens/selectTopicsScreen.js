import { View, Text, Dimensions, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {
  Avatar,
  Chip,
  IconButton,
  Pressable,
  Surface,
} from '@react-native-material/core';
import PostItem from '../Components/postItem';
import GroupItem from '../Components/groupItem';
import { followTopics, getTopicSuggestions, getUserTopics } from '../api/tawts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { useSelector } from 'react-redux';

const SelectTopicsScreen = ({ navigation }) => {
  const route = useRoute();
  const { data } = route.params;
  const { user } = useSelector((state) => state.auth);
  const toast = useToast(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const queryClient = useQueryClient();
  const topicsMutation = useMutation({
    mutationFn: followTopics,
    onSuccess: (data) => {
      queryClient.setQueryData(['topics'], (oldTopics) => {
        return [...oldTopics, selectedTopics];
      });
      queryClient.invalidateQueries(['topics'], { exact: true });
      navigation.navigate('User Suggestions');
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
    const topicsData = {
      follows: selectedTopics,
    };
    topicsMutation.mutate(topicsData);
  }
  const handleTopicPress = (item) => {
    if (selectedTopics.some((topic) => topic.topicId === item)) {
      setSelectedTopics(
        selectedTopics.filter((topic) => topic.topicId !== item)
      );
    } else {
      setSelectedTopics([
        ...selectedTopics,
        { userId: user.id, topicId: item },
      ]);
    }
  };
  return (
    <View className='h-full flex items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-14 bg-transparent'
        )}
        elevation={1}
      >
        <Text className='text-3xl font-bold text-slate-200 my-auto'>
          Topics
        </Text>
      </Surface>
      {data.map((item, index) => {
        return (
          <View className='w-full' key={index}>
            <Text
              className='text-2xl font-bold text-gray-200 break-words p-4 pb-5'
              numberOfLines={2}
            >
              {item.interest.charAt(0).toUpperCase() + item.interest.slice(1)}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              directionalLockEnabled={true}
              alwaysBounceVertical={false}
            >
              <FlatList
                data={item.topics}
                renderItem={({ item }) => {
                  return (
                    <Chip
                      label={
                        item.name.charAt(0).toUpperCase() + item.name.slice(1)
                      }
                      style={tw.style('m-1 border border-slate-500', {
                        backgroundColor: selectedTopics.some(
                          (topic) => topic.topicId === item.id
                        )
                          ? '#373d6be0'
                          : '#ffffff00',
                      })}
                      labelStyle={tw.style('text-slate-300 text-base my-auto')}
                      contentContainerStyle={tw.style(
                        'my-auto flex items-center justify-center'
                      )}
                      trailing={(props) => (
                        <Pressable
                          style={tw.style('', {
                            marginTop: -3,
                          })}
                          onPress={() => handleTopicPress(item.id)}
                        >
                          <Icon
                            name={
                              selectedTopics.some(
                                (topic) => topic.topicId === item.id
                              )
                                ? 'close'
                                : 'plus'
                            }
                            {...props}
                            color='#c3bcbc'
                            size={23}
                            style={tw.style('my-auto')}
                          />
                        </Pressable>
                      )}
                      trailingContainerStyle={tw.style(
                        'border-l border-slate-500 pl-1 my-2'
                      )}
                    />
                  );
                }}
                keyExtractor={(item) => item.id}
                scrollEnabled
                numColumns={parseInt(item.topics.length / 3)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                directionalLockEnabled
                alwaysBounceHorizontal={false}
              />
            </ScrollView>
          </View>
        );
      })}
      <Surface
        style={tw.style(
          'w-full absolute bottom-0 flex flex-row px-3 py-4 justify-end bg-transparent'
        )}
        elevation={2}
      >
        <Button
          title='Next'
          loading={topicsMutation.isLoading}
          buttonStyle={tw.style('rounded-full overflow-hidden px-4', {
            backgroundColor: '#4b3c59',
          })}
          disabledStyle={tw.style('', {
            backgroundColor: '#4b3c59',
          })}
          disabled={!selectedTopics.length}
          titleStyle={tw.style('font-bold text-xl')}
          onPress={onSubmit}
        />
      </Surface>
    </View>
  );
};

export default SelectTopicsScreen;
