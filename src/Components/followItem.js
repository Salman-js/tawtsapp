import { View, Text } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { followUser, getMyFollowings, unfollowUser } from '../api/user';
import { Pressable } from '@react-native-material/core';
import Modal from 'react-native-modal';
import { useState } from 'react';
import { Button } from 'react-native-paper';

const FollowItem = ({ id, name }) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  const myFollowingsQuery = useQuery({
    queryKey: ['followings'],
    queryFn: () => getMyFollowings(),
  });
  const followMutation = useMutation({
    mutationFn: followUser,
    onMutate: () => {
      queryClient.setQueryData(['followings'], (oldLikes) => {
        return [
          ...oldLikes,
          {
            id: new Date().getTime(),
            followerId: user.id,
            followedId: id,
            createdAt: new Date().getTime(),
          },
        ];
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['followings'], { exact: true });
    },
  });
  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
    onMutate: () => {
      queryClient.setQueryData(['followings'], (oldLikes) => {
        return oldLikes.filter(
          (liked) => parseInt(liked.followedId) !== parseInt(id)
        );
      });
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['followings'], { exact: true });
    },
  });
  function onFollow() {
    followMutation.mutate(id);
  }

  function unFollow() {
    unfollowMutation.mutate(id);
    setModalVisible(false);
  }
  return (
    <>
      {myFollowingsQuery.data.find(
        (relation) => parseInt(relation.followedId) === parseInt(id)
      ) ? (
        <View className='w-1/4 overflow-hidden rounded-full my-auto bg-slate-200'>
          <Pressable
            style={tw.style(
              'w-full py-1 px-2 flex justify-center items-center'
            )}
            onPress={() => setModalVisible(true)}
          >
            <Text className='text-sm text-[#271b2d] text-left'>Following</Text>
          </Pressable>
        </View>
      ) : (
        <View className='w-1/4 overflow-hidden border border-slate-200 rounded-full my-auto'>
          <Pressable
            style={tw.style(
              'w-full py-1 px-2 flex justify-center items-center'
            )}
            onPress={onFollow}
          >
            <Text className='text-sm text-slate-200 text-left'>Follow</Text>
          </Pressable>
        </View>
      )}
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
          <Text className='text-xl font-bold text-slate-200'>Unfollow?</Text>
          <Text className='text-lg mt-3 text-slate-200'>Unfollow {name}?</Text>
          <View className='w-full flex-row justify-end items-end space-x-2 mt-4'>
            <Button
              mode='text'
              onPress={() => setModalVisible(false)}
              labelStyle={tw.style('text-slate-200')}
            >
              Cancel
            </Button>
            <Button
              mode='text'
              onPress={unFollow}
              labelStyle={tw.style('text-slate-200')}
            >
              Unfollow
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default FollowItem;
