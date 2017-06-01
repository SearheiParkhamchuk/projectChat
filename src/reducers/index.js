import { combineReducers } from 'redux';
import messages from './messages';
import errorMessage from './error';
import user from './user';

export default combineReducers({
  user,
  messages,
  errorMessage,
});

