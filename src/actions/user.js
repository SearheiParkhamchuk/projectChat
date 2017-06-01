import { USER_SET_USERNAME, USER_SET_AVATAR } from '../constants/actionTypes';

export const setUsername = username => ({
  type: USER_SET_USERNAME,
  username,
  userId: username.toLowerCase() || `anonimous-${(Math.random() * 1000000000).toFixed()}`,
});

export const setAvatar = avatarUrl => ({
  type: USER_SET_AVATAR,
  avatarUrl,
});
