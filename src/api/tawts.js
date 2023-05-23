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

// Post a reply
export const replyToTawt = async (replyData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .post(`${URI}/api/post/reply/${replyData.postId}`, replyData, config)
    .then((res) => res.data);
};

// Like tawt
export const likeTawt = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .post(`${URI}/api/post/like/${id}`, config)
    .then((res) => res.data);
};

// Unike tawt
export const unlikeTawt = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .post(`${URI}/api/post/unlike/${id}`, config)
    .then((res) => res.data);
};

// Bookmark tawt
export const bookmarkTawt = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .post(`${URI}/api/post/bookmark/${id}`, config)
    .then((res) => res.data);
};

// remove tawt from bookmarks
export const removeBookmark = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .post(`${URI}/api/post/unbookmark/${id}`, config)
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

// Get trending tawts
export const getTrendingTawts = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/post/trending`, config)
    .then((res) => res.data);
};

// Get tawts by search
export const getTawtsBySearch = async (searchQuery) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/post/search/${searchQuery}`, config)
    .then((res) => res.data);
};

// Get single tawt
export const getTawt = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/post/single/${id}`, config)
    .then((res) => res.data[0]);
};

// Get reply to a tawt
export const getReplies = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/post/replies/${id}`, config)
    .then((res) => res.data);
};

// Get post likes
export const getPostLikes = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/post/likes/${id}`, config)
    .then((res) => res.data);
};

// Get user tawts
export const getUserTawts = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/post/user/${id}`, config)
    .then((res) => res.data);
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

// Get my likes
export const getMyLikes = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/likes`, config)
    .then((res) => res.data);
};

// Get my bookmarks
export const getMyBookmarks = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/bookmarks`, config)
    .then((res) => res.data);
};

// Post a reply to a reply
export const replyToReply = async (replyData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .post(`${URI}/api/post/reply/reply/${replyData.replyId}`, replyData, config)
    .then((res) => res.data);
};

// Like reply
export const likeReply = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .post(`${URI}/api/post/like/reply/${id}`, config)
    .then((res) => res.data);
};

// Unike reply
export const unlikeReply = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .post(`${URI}/api/post/unlike/reply/${id}`, config)
    .then((res) => res.data);
};

// Get replies to a reply
export const getReplyReplies = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/post/replies/reply/${id}`, config)
    .then((res) => res.data);
};

// Get reply likes
export const getReplyLikes = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/post/reply/likes/${id}`, config)
    .then((res) => res.data);
};

// Get topics
export const getUserTopics = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/topics`, config)
    .then((res) => res.data);
};

// Get topic suggestions
export const getTopicSuggestions = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
    timeout: 5000,
  };
  return await axios
    .get(`${URI}/api/user/topic/suggestions`, config)
    .then((res) => res.data);
};
