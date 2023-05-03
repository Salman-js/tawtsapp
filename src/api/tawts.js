import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URI } from './constants';

// Post tawt
export const postTawt = async (postData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .post(`${URI}/api/post`, postData, config)
    .then((res) => res.data);
};

// Get tawts
export const getTawts = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios.get(`${URI}/api/post`, config).then((res) => res.data);
};

// Get my tawts
export const getMyTawts = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/post/user`, config)
    .then((res) => res.data);
};
