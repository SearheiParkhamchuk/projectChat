import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

export default class NewMessage extends Component {
  static propTypes = {
    addMessage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    findDOMNode(this.refs.message).focus();
    findDOMNode(this).addEventListener('keydown', this.keyDown.bind(this));
  }

  componentWillUnmount() {
    findDOMNode(this).removeEventListener('keydown', this.keyDown.bind(this));
  }

  keyDown(e) {
    if (e.which !== 13 || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
      return;
    }
    this.submit(e);
  }

  submit(e) {
    e.preventDefault();
    const el = findDOMNode(this.refs.message);
    const text = el.value.trim();
    if (!text) {
      return;
    }
    this.props.addMessage(text);
    el.value = '';
  }

  render() {
    if (process.env.NODE_ENV !== 'production') {
      console.log('render new message form');
    }
    return (
      <div className="chat__footer">
        <form className="message-form" onSubmit={this.submit.bind(this)}>
          <textarea ref="message" className="message-form__input" placeholder="Сообщение..."/>
          <input className="button message-form__button input_button" type="submit" value=">"/>
        </form>
      </div>
    );
  }
}
