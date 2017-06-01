import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Message extends Component {
  static propTypes = {
    message: PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }),
    isOwn: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  render() {
    const { message, isOwn, onDelete } = this.props;
    return (
      <li className={`chat__message${isOwn ? ' chat__message_own' : ''}`}>
        <div className="chat__message_avatar">
          <img src={message.avatarUrl} alt={message.username} />
        </div>
        <div className="chat__message_header">
          <span className="chat__message_author">{message.username}</span>
          <input className="chat__message_button" type="button" value="x" onClick={() => onDelete(message.id)} />
          <span className="chat__message_date">
            {new Date(message.date).toLocaleString('ru', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="chat__message_text">{message.message}</div>
      </li>
    );
  }
}
