(() => {
  'use strict';

  // import
  const messageTemplate = window.messageTemplate;

  /**
   * @typedef {Object} ChatMessage
   * @property {string} userId
   * @property {string} username
   * @property {string} avatarUrl
   * @property {Date} date
   * @property {string} message
   */

  class Chat {

    /**
     * Create container element, init events.
     * @param {HtmlElement} el
     * @param {User} currentUser
     */
    constructor({ el, currentUser }) {
      this.el = el;
      this.currentUser = currentUser;
      this.containerEl = document.createElement('ul');
      this.containerEl.className = 'chat__messages';
      this.el.appendChild(this.containerEl);
      this.processedMessages = {};
      this.initEvents();
    }

    /**
     * Set event handler.
     * @param {event} event
     * @param {Function} handler
     */
    on(event, handler) {
      this.el.addEventListener(event, handler);
    }

    /**
     * Update exists messages on the chat.
     * @param {Object} messages the {ChatMessage} object (object key === messageId).
     */
    updateMessages(messages) {
      const ids = Object.keys(messages);
      let lastExistMessageId;
      ids.forEach((messageId) => {
        if (this.processedMessages[messageId]) {
          lastExistMessageId = messageId;
        } else {
          this.insertMessage(messageId, messages[messageId], lastExistMessageId);
        }
      });
      this.scrollToBottom();
    }

    /**
     * Remove message from a chat.
     * @param {string} messageId
     */
    deleteMessage(messageId) {
      if (!this.processedMessages[messageId]) {
        return;
      }
      const message = document.getElementById(messageId);
      if (!message) {
        return;
      }
      this.containerEl.removeChild(message);
      delete (this.processedMessages[messageId]);
    }

    /**
     * Insert a new message after described message (if present) or at the end otherwise.
     * @param {string} messageId The message ID.
     * @param {ChatMessage} message The message.
     * @param {number} afterMessageId
     */
    insertMessage(messageId, message, afterMessageId = 0) {
      this.processedMessages[messageId] = true;
      if (afterMessageId && this.processedMessages[afterMessageId]) {
        const afterEl = document.getElementById(afterMessageId);
        if (afterEl) {
          afterEl.insertAdjacentHTML('afterEnd', this.renderItem(messageId, message));
          this.processedMessages[afterMessageId] = true;
          return;
        }
      }
      this.containerEl.insertAdjacentHTML('beforeEnd', this.renderItem(messageId, message));
    }

    /**
     * Init the message events.
     */
    initEvents() {
      this.el.addEventListener('click', this.click.bind(this));
//      this.el.addEventListener('mouseover', this.mouseOverOut.bind(this));
    }

    /**
     * Chat message click handler
     * @param {Event} event
     */
    click(event) {
      event.preventDefault();
      if (event.target.type !== 'button') {
        return;
      }
      const messageItem = event.target.closest('li.chat__message');
      if (!messageItem || !messageItem.id) {
        return;
      }
      const deleteEvent = new CustomEvent('messageDelete', { detail: { messageId: messageItem.id } });
      this.el.dispatchEvent(deleteEvent);
    }

    /**
     * Chat message mouseover handler
     * @param {Event} event
     */
    mouseOverOut(event) {
      if (!event.target.classList.contains('chat__message_header')) {
        return;
      }
      event.target.querySelector('span.chat__message_date').hidden = true;
    }

    /**
     * Scroll chat window to bottom.
     */
    scrollToBottom() {
      this.el.scrollTop = this.el.scrollHeight;
    }

    /**
     * Render the message based on template.
     * @param {string} messageId The message ID.
     * @param {ChatMessage} message The message.
     * @returns {string}
     */
    renderItem(messageId, message) {
      return messageTemplate({
        id: messageId,
        isOwn: this.currentUser.userId === message.userId,
        username: message.username || this.currentUser.defaultUsername,
        avatarUrl: message.avatarUrl || this.currentUser.defaultAvatarUrl,
        date: new Date(message.date),
        text: message.message,
      });
    }
  }

  // export
  window.Chat = Chat;
})();
