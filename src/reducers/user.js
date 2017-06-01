import Storage from '../api/StorageApi';
import { USER_SET_USERNAME, USER_SET_AVATAR } from '../constants/actionTypes';

const createUserId = (username) => {
  const userId = username
    ? username.toLowerCase()
    : `anonimous-${(Math.random() * 1000000000).toFixed()}`;
  Storage.setItem('userId', userId);

  return userId;
};

const initialState = {
  userId: Storage.getItem('userId') || createUserId(),
  username: Storage.getItem('username'),
  avatarUrl: Storage.getItem('avatarUrl'),
  defaultUsername: 'Аноним',
  defaultAvatarUrl: './assets/img/noAvatar.jpg',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SET_USERNAME: {
      const userId = action.username !== state.username
        ? createUserId(action.username)
        : state.userId;
      Storage.setItem('username', action.username);
      Storage.setItem('userId', userId);
      return {
        ...state,
        username: action.username,
        userId,
      };
    }
    case USER_SET_AVATAR: {
      Storage.setItem('avatarUrl', action.avatarUrl);
      return {
        ...state,
        avatarUrl: action.avatarUrl,
      };
    }
    default: {
      return state;
    }
  }
};
