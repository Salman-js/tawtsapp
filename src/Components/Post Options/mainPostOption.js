import { View, Text } from 'react-native';
import tw from 'twrnc';
import Feather from '@expo/vector-icons/Feather';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import { ListItem } from '@react-native-material/core';
import { List } from 'react-native-paper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { blockUser, followUser, muteUser, unfollowUser } from '../../api/user';
import { unfollowTopic } from '../../api/tawts';

const MainPostOption = ({ isModalVisible, setIsModalVisible, post }) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.auth);
  const muteUserMutation = useMutation({
    mutationFn: muteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['tawts'], { exact: true });
    },
  });
  const unFollowTopic = useMutation({
    mutationFn: unfollowTopic,
    onSuccess: () => {
      queryClient.invalidateQueries(['tawts'], { exact: true });
    },
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
            followedId: post.userId,
            createdAt: new Date().getTime(),
          },
        ];
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['followings'], { exact: true });
      queryClient.invalidateQueries(['tawts'], { exact: true });
    },
  });
  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
    onMutate: () => {
      queryClient.setQueryData(['followings'], (oldLikes) => {
        return oldLikes.filter(
          (liked) => parseInt(liked.followedId) !== parseInt(post.userId)
        );
      });
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['followings'], { exact: true });
      queryClient.invalidateQueries(['tawts'], { exact: true });
    },
  });
  const blockMutation = useMutation({
    mutationFn: blockUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['tawts'], { exact: true });
    },
  });
  function onFollow() {
    followMutation.mutate(post.userId);
    setIsModalVisible(false);
  }

  function unFollow() {
    unfollowMutation.mutate(post.userId);
    setIsModalVisible(false);
  }
  function onMuteUser() {
    muteUserMutation.mutate(post.userId);
    setIsModalVisible(false);
  }
  function unfollowTopic(id) {
    unFollowTopic.mutate(id);
    setIsModalVisible(false);
  }
  function onBlock() {
    blockMutation.mutate(post.userId);
    setIsModalVisible(false);
  }
  return (
    <Modal
      isVisible={isModalVisible}
      onSwipeComplete={() => setIsModalVisible(false)}
      swipeDirection={['down']}
      backdropColor='#271b2d77'
      onBackdropPress={() => setIsModalVisible(false)}
      style={tw.style('flex justify-end m-0')}
    >
      <View className='bg-[#32283c] w-full rounded-2xl py-3'>
        <View className='rounded-full p-[3px] w-10 bg-slate-500 mx-auto'></View>
        {queryClient
          .getQueryData(['topics'])
          .find((topic) => post.body?.includes(topic.name)) &&
          post.userId !== user?.id && (
            <>
              <List.Item
                title='Not interested in this post'
                titleStyle={tw.style('text-lg')}
                left={(props) => (
                  <Icon
                    name='emoticon-sad-outline'
                    {...props}
                    size={24}
                    color='#b1adad'
                  />
                )}
                onPress={() => {
                  unfollowTopic(
                    queryClient.getQueryData(['topics'])[
                      queryClient
                        .getQueryData(['topics'])
                        .findIndex((topic) => post.body?.includes(topic.name))
                    ].id
                  );
                }}
              />
              <View className='p-[1px] w-4/5 bg-slate-700 mx-auto'></View>
            </>
          )}
        {!queryClient
          .getQueryData(['followings'])
          .find(
            (followed) =>
              parseInt(followed.followedId) === parseInt(post.userId)
          ) &&
          parseInt(post.userId) !== user?.id && (
            <List.Item
              title={`Follow @${post.userHandle}`}
              titleStyle={tw.style('text-lg')}
              left={(props) => (
                <Feather
                  name='user-plus'
                  {...props}
                  size={24}
                  color='#b1adad'
                />
              )}
              onPress={onFollow}
            />
          )}
        {queryClient
          .getQueryData(['followings'])
          .find(
            (followed) =>
              parseInt(followed.followedId) === parseInt(post.userId)
          ) && (
          <List.Item
            title={`Unfollow @${post.userHandle}`}
            titleStyle={tw.style('text-lg')}
            left={(props) => (
              <Feather name='user-x' {...props} size={24} color='#b1adad' />
            )}
            onPress={unFollow}
          />
        )}
        {user?.id !== parseInt(post.userId) && (
          <List.Item
            title={`Mute @${post.userHandle}`}
            titleStyle={tw.style('text-lg')}
            left={(props) => (
              <Feather name='user-minus' {...props} size={24} color='#b1adad' />
            )}
            onPress={onMuteUser}
          />
        )}
        {user?.id !== parseInt(post.userId) && (
          <List.Item
            title={`Block @${post.userHandle}`}
            titleStyle={tw.style('text-lg')}
            left={(props) => (
              <Icon name='block-helper' {...props} size={24} color='#b1adad' />
            )}
            onPress={onBlock}
          />
        )}
        {user?.id === parseInt(post.userId) && (
          <List.Item
            title='Delete post'
            titleStyle={tw.style('text-lg')}
            left={(props) => (
              <Feather name='trash-2' {...props} size={24} color='#b1adad' />
            )}
          />
        )}
        {user?.id !== parseInt(post.userId) && (
          <>
            <View className='p-[1px] w-4/5 bg-slate-700 mx-auto'></View>
            <List.Item
              title='Report post'
              titleStyle={tw.style('text-lg')}
              left={(props) => (
                <Feather name='flag' {...props} size={24} color='#b1adad' />
              )}
            />
          </>
        )}
      </View>
    </Modal>
  );
};

export default MainPostOption;
