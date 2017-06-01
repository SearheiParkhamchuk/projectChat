import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { findDOMNode } from 'react-dom';

export default class UserForm extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    setUsername: PropTypes.func.isRequired,
    setAvatar: PropTypes.func.isRequired,
  };

  componentDidMount() {
    findDOMNode(this.refs.username).focus();
  }

  handleChange(e) {
    const { action } = e.target.dataset;
    const value = e.target.value.trim();
    if (action && this.props[action]) {
      this.props[action](value);
    }
  }

  render() {
    if (process.env.NODE_ENV !== 'production') {
      console.log('render user form');
    }
    const { username, avatarUrl } = this.props.user;

    return (
      <div className="chat__user">
        <h2>Имя и аватар пользователя</h2>
        <form className="user-form" onSubmit={() => false}>
          <input
            className="user__input user__input_username"
            ref="username"
            data-action="setUsername"
            placeholder="Ваше имя"
            value={username || ''}
            onChange={this.handleChange.bind(this)}
          />
          <input
            className="user__input user__input_avatar"
            data-action="setAvatar"
            name="avatarUrl"
            placeholder="URL аватары"
            value={avatarUrl || ''}
            onChange={this.handleChange.bind(this)}
          />
        </form>
        <Link className="user__input user__input_button input_button" to="/">Вернуться в чат</Link>
      </div>
    );
  }
}
