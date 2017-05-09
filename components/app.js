(() => {
  'use strict';

  // import
  const Notice = window.Notice;
  const User = window.User;
  const Chat = window.Chat;
  const MessageForm = window.MessageForm;

  class App {

    constructor({ userEl, messageFormEl, chatEl }) {
      this.user = new User({ el: userEl, Notice });
      this.messageForm = new MessageForm({ el: messageFormEl, Notice });
      this.chat = new Chat({ el: chatEl, messages: this.getInitialMessages() });
      this.initEvents();
    }

    /**
     * Init the application events.
     */
    initEvents() {
      this.messageForm.on('messageSubmit', this.onMessageSubmit.bind(this));
    }

    /**
     * Callback for message submit. Link MessageForm and Chat components.
     * @param event
     */
    onMessageSubmit(event) {
      this.chat.addMessage({
        username: this.user.getUsername(),
        date: new Date(),
        message: event.detail.message,
        isOwn: true,
      });
    }

    /**
     * Get the initial messages from the server.
     * @returns {[ChatMessage]}
     */
    getInitialMessages() {
      // TODO: get messages from server
      return [
        {
          username: 'Василий Иванович',
          date: new Date(),
          message: 'Всем привет!',
          isOwn: false,
        },
        {
          username: 'Петька',
          date: new Date(),
          message: 'Здрасьте',
          isOwn: false,
        },
        {
          username: 'Фурманов',
          date: new Date(),
          message: 'Ну вот, опять народ набежал... :(',
          isOwn: false,
        },
        {
          username: 'Болтун',
          date: new Date(),
          message: 'Ходят слухи, что отлично работает логин testuser и пароль 12345',
          isOwn: false,
        },
      ];
    }

    /**
     * Render the application.
     */
    render() {
      this.user.render();
      this.messageForm.render();
      this.chat.render();
    }
  }

  // export
  window.App = App;
})();
