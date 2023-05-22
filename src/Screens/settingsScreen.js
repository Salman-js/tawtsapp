import { View, Text, Dimensions, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { Avatar, Pressable, Surface } from '@react-native-material/core';
import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../slices/authSlice';

const SettingsScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const buttons = [
    {
      title: 'Personal Data',
      icon: <Icon name='account' color='#a89f9f' size={30} />,
      action: () => navigation.navigate('Verify Account'),
    },
    {
      title: 'Help center',
      icon: <Icon name='help-circle' color='#a89f9f' size={30} />,
    },
    {
      title: 'Logout',
      icon: <Feather name='log-out' color='#a57171' size={30} />,
      action: () => setModalVisible(true),
    },
  ];
  useEffect(() => {
    const scrollToTop = navigation.addListener('tabPress', (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
  }, []);
  return (
    <View className='h-full flex items-center bg-[#271b2d] w-full'>
      <Surface
        style={tw.style(
          'w-full flex flex-row justify-between p-4 pt-14 bg-transparent'
        )}
        elevation={1}
      >
        <Text className='text-3xl font-bold text-slate-200 my-auto'>
          Settings
        </Text>
      </Surface>
      <View className='w-full'>
        <ScrollView className='w-full' alwaysBounceVertical ref={scrollView}>
          {buttons.map((button, index) => {
            return (
              <Surface
                style={tw.style(
                  'w-11/12 rounded-2xl p-0 mt-3 overflow-hidden',
                  {
                    backgroundColor: '#32283c',
                  }
                )}
                elevation={3}
                key={index}
              >
                <Pressable
                  style={tw.style('p-2 w-full flex flex-row justify-between')}
                  onPress={button.action}
                >
                  <View className='flex flex-row'>
                    <View className='p-3 rounded-2xl bg-slate-600 flex justify-center items-center'>
                      {button.icon}
                    </View>
                    <Text
                      style={tw.style(
                        'text-xl text-slate-200 text-left my-auto mx-4',
                        {
                          fontWeight: '900',
                        }
                      )}
                    >
                      {button.title}
                    </Text>
                  </View>
                  {index !== 2 && (
                    <Entypo
                      name='chevron-thin-right'
                      color='#a89f9f'
                      size={25}
                      style={tw.style('my-auto mx-2')}
                    />
                  )}
                </Pressable>
              </Surface>
            );
          })}
        </ScrollView>
      </View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn='zoomIn'
        animationOut='zoomOut'
        animationInTiming={300}
        animationOutTiming={300}
        backdropOpacity={0.2}
      >
        <View className='w-4/5 rounded-xl m-auto p-6 flex bg-[#32283c]'>
          <Text className='text-xl font-bold text-slate-200'>Logout?</Text>
          <Text className='text-lg mt-3 text-slate-200'>
            Are you sure you want to logout?
          </Text>
          <View className='w-full flex-row justify-end items-end space-x-2 mt-4'>
            <Button
              mode='text'
              onPress={() => setModalVisible(false)}
              labelStyle={tw.style('text-slate-200')}
            >
              No
            </Button>
            <Button
              mode='text'
              onPress={() => {
                setModalVisible(false);
                dispatch(setLogout());
              }}
              labelStyle={tw.style('text-slate-200')}
            >
              Yes
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsScreen;
