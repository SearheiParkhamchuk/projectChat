import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { MESSAGES_UPDATE_INTERVAL } from '../constants/api';
import Message from './Message';

export default class Messages extends Component {
  static propTypes = {
    items: PropTypes.object.isRequired,
    itemsQty: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    currentUserId: PropTypes.string.isRequired,
    syncMessages: PropTypes.func.isRequired,
    deleteMessage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.props.syncMessages();
    this.handleVisibilityBind = this.handleVisibility.bind(this);
  }

  gotoBottom() {
    const chat = findDOMNode(this);
    setTimeout(() => {
      chat.scrollTop = chat.scrollHeight;
    }, 1);
  }

  /**
   * Periodically messages updating.
   * @param {number} interval
   */
  intervalUpdate(interval) {
    this.props.syncMessages();
    this.timerId = setTimeout(() => {
      this.intervalUpdate.call(this, interval);
    }, interval);
  }

  /**
   * Start periodically messages updating.
   * @param {number} interval
   */
  startIntervalUpdate(interval = MESSAGES_UPDATE_INTERVAL) {
    this.stopIntervalUpdate();
    this.intervalUpdate(interval);
  }

  /**
   * Start periodically messages updating.
   */
  stopIntervalUpdate() {
    clearTimeout(this.timerId);
  }

  handleVisibility() {
    if (document.visibilityState === 'hidden') {
      this.stopIntervalUpdate();
    } else {
      this.startIntervalUpdate();
    }
  }

  componentDidMount() {
    document.addEventListener('visibilitychange', this.handleVisibilityBind);
    this.startIntervalUpdate();
    this.gotoBottom();
  }

  componentWillReceiveProps () {
    this.gotoBottom();
  }

  componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.handleVisibilityBind);
    this.stopIntervalUpdate();
  }

  renderMessages() {
    const { items, currentUserId, deleteMessage } = this.props;
    const messagesIds = Object.keys(items);

    return (
      <ul>
        {messagesIds.map((messageId) =>
          <Message
            key={messageId}
            message={items[messageId]}
            isOwn={currentUserId === items[messageId].userId}
            onDelete={deleteMessage}
          />
        )}
      </ul>
    );
  }

  render() {
    if (process.env.NODE_ENV !== 'production') {
      console.log('render chat messages');
    }
    const { itemsQty, isFetching } = this.props;

    return (
      <div className={`chat__messages ${isFetching && !itemsQty ? 'loading' : ''}`}>
        {itemsQty
          ? this.renderMessages()
          : <h2>Сообщений пока нет.</h2>
        }
      </div>
    );
  }
}
