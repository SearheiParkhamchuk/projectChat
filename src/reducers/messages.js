import {
  MESSAGES_INVALIDATE, MESSAGES_REQUEST, MESSAGES_SUCCESS,
  MESSAGE_ADD_SUCCESS, MESSAGE_DELETE_SUCCESS,
} from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  didInvalidate: false,
  items: {},
  itemsQty: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MESSAGES_INVALIDATE: {
      return {
        ...state,
        didInvalidate: true,
      };
    }
    case MESSAGES_REQUEST: {
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    }
    case MESSAGES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        itemsQty: action.itemsQty,
        lastUpdated: action.receivedAt,
      };
    }
    case MESSAGE_ADD_SUCCESS: {
      return {
        ...state,
        items: { ...state.items, [action.messageId]: action.message },
        itemsQty: state.itemsQty + 1,
      };
    }
    case MESSAGE_DELETE_SUCCESS: {
      const items = { ...state.items };
      delete items[action.messageId];
      return {
        ...state,
        items,
        itemsQty: state.itemsQty - 1,
      };
    }
    default: {
      return state;
    }
  }
};
