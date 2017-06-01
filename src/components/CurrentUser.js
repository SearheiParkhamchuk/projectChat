import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CurrentUser extends Component {
  static propTypes = {
    user: PropTypes.shape({
      defaultUsername: PropTypes.string.isRequired,
      defaultAvatarUrl: PropTypes.string.isRequired,
    }),
  };

  render() {
    if (process.env.NODE_ENV !== 'production') {
      console.log('render current user');
    }
    const { username, defaultUsername, avatarUrl, defaultAvatarUrl } = this.props.user;

    return (
      <div className="user">
        <h1 className="user__username">
          {username || defaultUsername}
          <Link to="/user" className="user__button" />
        </h1>
        <figure className="user__avatar">
          <img src={avatarUrl || defaultAvatarUrl} alt={username || defaultUsername} />
        </figure>
      </div>
    );
  }
}
