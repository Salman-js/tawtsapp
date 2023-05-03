import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URI } from './constants';

// Get my followers
export const getMyFollowers = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/followers`, config)
    .then((res) => res.data);
};

// Get my followings
export const getMyFollowings = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/followings`, config)
    .then((res) => res.data);
};

// Get users's followers
export const getFollowers = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/followers/:id`, config)
    .then((res) => res.data);
};

// Get user's followings
export const getFollowings = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/followings/${id}`, config)
    .then((res) => res.data);
};
