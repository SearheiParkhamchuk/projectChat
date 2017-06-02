import {
  MESSAGES_INVALIDATE, MESSAGES_REQUEST, MESSAGES_SUCCESS, MESSAGES_FAILURE,
  MESSAGE_ADD_SUCCESS, MESSAGE_ADD_FAILURE, MESSAGE_DELETE_SUCCESS, MESSAGE_DELETE_FAILURE,
  ERROR_MESSAGE_RESET,
} from '../constants/actionTypes';
import { MESSAGES_UPDATE_INTERVAL } from '../constants/fetchApi';
import fetchApi from '../api/fetchApi';

export const messagesInvalidate = () => ({
  type: MESSAGES_INVALIDATE,
});

const messagesRequest = () => ({
  type: MESSAGES_REQUEST,
});

const formatMessage = (message, messageId, user) => ({
  ...message,
  id: messageId,
  username: message.username || user.defaultUsername,
  avatarUrl: message.avatarUrl || user.defaultAvatarUrl,
});

const messagesSuccess = (json, user) => {
  const messagesIds = json ? Object.keys(json) : [];
  const items = {};
  messagesIds.forEach((itemId) => {
    items[itemId] = formatMessage(json[itemId], itemId, user);
  });

  return {
    type: MESSAGES_SUCCESS,
    items,
    itemsQty: messagesIds.length,
    receivedAt: Date.now(),
  };
};

const shouldFetchMessages = (state) => {
  if (!state.itemsQty) {
    return true;
  }
  if (state.isFetching) {
    return false;
  }
  if (!state.lastUpdated || state.lastUpdated + MESSAGES_UPDATE_INTERVAL < Date.now() ) {
    return true;
  }
  return state.didInvalidate;
};

const fetchMessages = () => (dispatch, getState) => {
  const { user } = getState();
  dispatch(messagesRequest());
  return fetchApi('/messages.json')
    .then(
      json => dispatch(messagesSuccess(json, user)),
      error => dispatch({
        type: MESSAGES_FAILURE,
        error: `Не удалось загрузить сообщения чата (${error.message || 'unknown error'})`,
      })
    );
};

export const syncMessages = () => (dispatch, getState) => {
  if (shouldFetchMessages(getState().messages)) {
    return dispatch(fetchMessages());
  }
  return Promise.resolve();
};

const messageAddSuccess = (message, json, user) => {
  const { name } = json;

  return {
    type: MESSAGE_ADD_SUCCESS,
    message: formatMessage(message, name, user),
    messageId: name,
  };
};

export const addMessage = text => (dispatch, getState) => {
  const { user } = getState();
  const message = {
    userId: user.userId,
    username: user.username,
    avatarUrl: user.avatarUrl,
    date: Date.now(),
    message: text,
  };

  return fetchApi('/messages.json', { method: 'post', body: JSON.stringify(message) })
    .then(
      json => dispatch(messageAddSuccess(message, json, user)),
      error => dispatch({
        type: MESSAGE_ADD_FAILURE,
        error: `Не удалось отправить сообщение (${error.message || 'unknown error'})`,
      })
    );
};

export const messageDeleteSuccess = (messageId) => {
  return {
    type: MESSAGE_DELETE_SUCCESS,
    messageId,
  };
};

export const deleteMessage = messageId => (dispatch) => {
  return fetchApi(`/messages/${messageId}.json`, { method: 'delete' })
    .then(
      () => dispatch(messageDeleteSuccess(messageId)),
      error => dispatch({
        type: MESSAGE_DELETE_FAILURE,
        error: `Ошибка удаления сообщения (${error.message || 'unknown error'})`,
      })
    );
};

export const resetErrorMessage = () => ({
  type: ERROR_MESSAGE_RESET,
});
