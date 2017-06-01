import React, { Component } from 'react';
import { connect } from 'react-redux';
import { syncMessages, addMessage, deleteMessage, resetErrorMessage } from '../actions/messages';
import Messages from '../components/ChatMessages';
import ErrorMessage from '../components/ErrorMessage';
import NewMessage from '../components/NewMessage';

const MessagesComponent = connect(
  state => ({
    messages: state.messages,
    items: state.messages.items,
    itemsQty: state.messages.itemsQty,
    isFetching: state.messages.isFetching,
    lastUpdated: state.messages.lastUpdated,
    currentUserId: state.user.userId,
  }),
  {
    deleteMessage,
    syncMessages,
  }
)(Messages);

const ErrorMessageComponent = connect(
  state => ({ errorMessage: state.errorMessage }),
  { resetErrorMessage }
)(ErrorMessage);

const NewMessageComponent = connect(
  null,
  { addMessage }
)(NewMessage);

export default class ChatMessages extends Component {
  render() {
    if (process.env.NODE_ENV !== 'production') {
      console.log('render chat page');
    }

    return (
      <div className="chat__content">
        <MessagesComponent />
        <ErrorMessageComponent />
        <NewMessageComponent />
      </div>
    );
  }
}
