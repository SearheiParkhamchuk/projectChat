import React from 'react';
import { connect } from 'react-redux';
import { setUsername, setAvatar } from '../actions/user';
import UserForm from '../components/UserForm';

const UserFormComponent = connect(
  state => ({ user: state.user }),
  { setUsername, setAvatar }
)(UserForm);

export default () => (
  <div className="chat__content">
    <UserFormComponent />
  </div>
);
