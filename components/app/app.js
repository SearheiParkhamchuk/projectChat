(() => {
  'use strict';

  // import
  const HttpRequest = window.HttpRequest;
  const Notice = window.Notice;
  const User = window.User;
  const Chat = window.Chat;
  const MessageForm = window.MessageForm;

  class App {

    constructor({ userEl, messageFormEl, chatEl }) {
      this.user = new User({ el: userEl, Notice });
      this.chat = new Chat({ el: chatEl, currentUser: this.user });
      this.messageForm = new MessageForm({ el: messageFormEl });
      this.initEvents();
    }

    /**
     * Init the application events.
     */
    initEvents() {
      this.messageForm.on('messageSubmit', this.messageSubmit.bind(this));
      this.chat.on('messageDelete', this.deleteMessage.bind(this));
    }

    /**
     * Periodically request server for new messages and do update.
     * @param {number} delay
     */
    intervalUpdate(delay = 3000) {
      this.updateMessages();
      setTimeout(() => {
        this.intervalUpdate.call(this, delay);
      }, delay);
    }

    /**
     * Get actual messages from the serber and update messages list.
     */
    updateMessages() {
      const request = new HttpRequest({ path: 'messages.json' });
      request.send()
        .then((response) => {
          this.chat.updateMessages(response);
        })
        .catch((error) => {
          // TODO: Обработать ошибку
          console.log('Error', error);
        });
    }

    /**
     * Callback for message submit. Link MessageForm and Chat components.
     * @param {Event} event
     */
    messageSubmit(event) {
      const message = {
        userId: this.user.userId,
        username: this.user.data.username,
        avatarUrl: this.user.data.avatarUrl,
        date: new Date().getTime(),
        message: event.detail.message,
      };
      console.log(message);
      const request = new HttpRequest({ type: 'POST', path: 'messages.json' });
      request.send(message)
        .then((response) => {
          this.updateMessages();
        })
        .catch((error) => {
          // TODO: Обработать ошибку
          console.log('Error', error);
        });
    }

    /**
     * Callback for message delete.
     * @param {Event} event
     */
    deleteMessage(event) {
      const messageId = event.detail.messageId;
      const request = new HttpRequest({ type: 'DELETE', path: `messages/${messageId}.json` });
      request.send()
        .then(() => {
          this.chat.deleteMessage(messageId);
        })
        .catch((error) => {
          // TODO: Обработать ошибку
          console.log('Error', error);
        });
    }

    /**
     * Render the application.
     */
    render() {
      this.user.render();
      this.messageForm.render();
      this.intervalUpdate();
    }
  }

  // export
  window.App = App;
})();
