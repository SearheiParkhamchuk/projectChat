import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorMessage extends Component {
  static propTypes = {
    resetErrorMessage: PropTypes.func.isRequired,
  };

  render() {
    if (process.env.NODE_ENV !== 'production') {
      console.log('render error message');
    }
    const { errorMessage, resetErrorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <div className="chat__error">
        {errorMessage}
        <input className="chat__message_button" type="button" value="x" onClick={resetErrorMessage} />
      </div>
    )
  }
}
