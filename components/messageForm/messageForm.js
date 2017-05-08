(function () {
  'use strict';

  /**
   * @typedef {Object} ChatMessage
   * @property {string} username
   * @property {Date} date
   * @property {string} message
   */

  class MessageForm {

    constructor({ el }) {
      this.el = el;
      this.initEvents();
    }

    /**
     * Init the message events.
     */
    initEvents() {
      this.el.addEventListener('submit', this.onSubmit.bind(this));
    }

    /**
     * Get the message input Html element.
     * @returns {HtmlElement}
     */
    getMessageElement() {
      if (!this.inputEl) {
        this.inputEl = this.el.querySelector('[name="message"]');
      }
      return this.inputEl;
    }

    /**
     * Get submitted message and then clear the element value.
     * @returns {string}
     */
    getMessage() {
      const inputEl = this.getMessageElement();
      const message = inputEl.value;
      inputEl.value = '';
      return message;
    }

    /**
     * Message submit callback
     * @param event
     */
    onSubmit(event) {
      event.preventDefault();
      const message = this.getMessage();
      if (!message) {
        Notice.clearNotices();
        new Notice({
          el: this.getMessageElement(),
          message: 'Чтобы что-то отправить, нужно что-нибудь написать!',
          position: 'top',
          className: 'notice-error',
        });
        return;
      }
      const onSubmitEvent = new CustomEvent('onSubmit', { detail: { message } });
      this.el.dispatchEvent(onSubmitEvent);
    }

    /**
     * Render the message form block.
     */
    render() {
      this.el.innerHTML = `
        <form class="message-form">
          <input name="message" placeholder="Сообщение..." autocomplete="off" class="input message-form__message" />
          <input type="submit" class="button message-form__button" />
        </form>
      `;
    }
  }

  //export
  window.MessageForm = MessageForm;
})();

