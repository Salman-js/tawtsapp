import { View, Text } from 'react-native';
import tw from 'twrnc';
import Feather from '@expo/vector-icons/Feather';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import { ListItem } from '@react-native-material/core';
import { List } from 'react-native-paper';
import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const MainPostOption = ({ isModalVisible, setIsModalVisible, post }) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.auth);
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
        {user.id !== parseInt(post.userId) && (
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
            />
            <View className='p-[1px] w-4/5 bg-slate-700 mx-auto'></View>
          </>
        )}
        {!queryClient
          .getQueryData(['followings'])
          .filter(
            (followed) =>
              parseInt(followed.followedId) === parseInt(post.userId) &&
              post.userId !== user.id
          ) && (
          <List.Item
            title={`Follow @${post.userHandle}`}
            titleStyle={tw.style('text-lg')}
            left={(props) => (
              <Feather name='user-plus' {...props} size={24} color='#b1adad' />
            )}
          />
        )}
        {queryClient
          .getQueryData(['followings'])
          .find(
            (user) =>
              parseInt(user.id) === parseInt(post.userId) && (
                <List.Item
                  title={`Unfollow @${post.userHandle}`}
                  titleStyle={tw.style('text-lg')}
                  left={(props) => (
                    <Feather
                      name='user-x'
                      {...props}
                      size={24}
                      color='#b1adad'
                    />
                  )}
                />
              )
          )}
        {user.id !== parseInt(post.userId) && (
          <List.Item
            title={`Mute @${post.userHandle}`}
            titleStyle={tw.style('text-lg')}
            left={(props) => (
              <Feather name='user-minus' {...props} size={24} color='#b1adad' />
            )}
          />
        )}
        {/* {!queryClient
          .getQueryData(['blocked'])
          .filter(
            (blocked) =>
              parseInt(blocked.blockedId) === parseInt(post.userId).length &&
              post.userId !== user.id
          ) && ( */}

        {user.id !== parseInt(post.userId) && (
          <List.Item
            title={`Block @${post.userHandle}`}
            titleStyle={tw.style('text-lg')}
            left={(props) => (
              <Icon name='block-helper' {...props} size={24} color='#b1adad' />
            )}
          />
        )}
        {/* )} */}
        {user.id === parseInt(post.userId) && (
          <List.Item
            title='Delete post'
            titleStyle={tw.style('text-lg')}
            left={(props) => (
              <Feather name='trash-2' {...props} size={24} color='#b1adad' />
            )}
          />
        )}
        {user.id !== parseInt(post.userId) && (
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
