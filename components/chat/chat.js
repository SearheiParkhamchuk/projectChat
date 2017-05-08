(function () {
  'use strict';

  /**
   * @typedef {Object} ChatMessage
   * @property {string} username
   * @property {Date} date
   * @property {string} message
   * @property {boolean} isOwn
   */

  class Chat {

    constructor({ el, messages = [] }) {
      this.el = el;
      this.messages = messages;
    }

    /**
     * Add message to chat store.
     * @param {ChatMessage} message
     */
    addMessage(message) {
      this.messages.push(message);
      this.render();
    }

    /**
     * Render the chat block.
     */
    render() {
      const messagesHTML = this.messages.map(message => `
        <div class="chat__message${message.isOwn ? ' chat__message_own' : ''}">
            <div class="chat__date">${message.date.toLocaleString('ru', { hour: '2-digit', minute: '2-digit' })}</div>
            <div class="chat__text">
                <span class="chat__text_author">${message.username}</span>
                ${message.message}
            </div>
        </div>
      `).join('\n');

      this.el.innerHTML = `
        <div class="chat">
          ${messagesHTML}
        </div>
      `;
      this.el.scrollTop = this.el.scrollHeight;
    }
  }

  //export
  window.Chat = Chat;
})();
