import { ERROR_MESSAGE_RESET } from '../constants/actionTypes';

export default (state = null, action) => {
  const { type, error } = action;

  if (type === ERROR_MESSAGE_RESET) {
    return null;
  } else if (error) {
    return error;
  }

  return state;
};
