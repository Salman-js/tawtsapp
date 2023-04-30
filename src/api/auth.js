import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  setAuthenticated,
  setLoading,
  setLoadingFalse,
  setLogout,
  setUser,
} from '../../slices/authSlice';
import { setErrors } from '../../slices/errorSlice';
import setAuthToken from '../utils/setAuthToken';
import { URI } from './constants';

// Login
export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${URI}/api/auth`, body, config);
    dispatch(setAuthenticated());
    try {
      await AsyncStorage.setItem('token', res.data.token);
    } catch (e) {
      console.log(e);
    }
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      dispatch(setErrors(err.response.data));
      dispatch(setLoadingFalse());
      console.log('Error response: ', err.response);
    } else if (err.request) {
      let errs = {};
      errs.connection = true;
      dispatch(setErrors(errs));
      dispatch(setLoadingFalse());
      console.log('Error request: ', err.request);
    } else {
      let errs = {};
      errs.unknown = true;
      dispatch(setErrors(errs));
      dispatch(setLoadingFalse());
      console.log('Error: ', err);
    }
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Token: ', token);
    setAuthToken(token);
  } catch (err) {
    console.log(err);
  }
  try {
    const res = await axios.get(`${URI}/api/auth`);
    console.log(res.data);
    dispatch(setUser(res.data));
  } catch (err) {
    if (err.response) {
      dispatch(setErrors(err.response.data));
      dispatch(setLoadingFalse());
      console.log('Error response: ', err.response);
    } else if (err.request) {
      let errs = {};
      errs.connection = true;
      dispatch(setErrors(errs));
      dispatch(setLoadingFalse());
      console.log('Error request: ', err.request);
    } else {
      let errs = {};
      errs.unknown = true;
      dispatch(setErrors(errs));
      dispatch(setLoadingFalse());
      console.log('Error: ', err);
    }
  }
};

// Register user
export const register = (userData) => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  };

  const body = JSON.stringify(userData);

  try {
    const res = await axios.post(`${URI}/api/affiliate`, body, config);
    dispatch(setAuthenticated());
    try {
      await AsyncStorage.setItem('token', res.data.token);
    } catch (e) {
      console.log(e);
    }
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      dispatch(setErrors(err.response.data));
      dispatch(setLoadingFalse());
      console.log('Error response: ', err.response);
    } else if (err.request) {
      let errs = {};
      errs.connection = true;
      dispatch(setErrors(errs));
      dispatch(setLoadingFalse());
      console.log('Error request: ', err.request);
    } else {
      let errs = {};
      errs.unknown = true;
      dispatch(setErrors(errs));
      dispatch(setLoadingFalse());
      console.log('Error: ', err);
    }
  }
};

export const logout = () => async (dispatch) => {
  dispatch(setLogout());
  await AsyncStorage.removeItem('token');
};
