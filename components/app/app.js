import styles from './app.css';
import Storage from '../../modules/storage';
import HttpRequest from '../../modules/httpRequest';
import Chat from '../chat/chat';
import User from '../user/user';
import MessageForm from '../messageForm/messageForm';

const serverRequest = new HttpRequest('https://mevlchat.firebaseio.com');
const UPDATE_MESSAGES_INTERVAL = 3000;

class App {

  constructor({ userEl, messageFormEl, chatEl }) {
    this.user = new User({ el: userEl, Storage });
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
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.stopIntervalUpdate();
      } else {
        this.startIntervalUpdate();
      }
    });
  }

  /**
   * Start periodically messages updating.
   * @param {number} interval
   */
  startIntervalUpdate(interval = UPDATE_MESSAGES_INTERVAL) {
    this.intervalUpdate(interval);
  }

  /**
   * Start periodically messages updating.
   */
  stopIntervalUpdate() {
    clearTimeout(this.timerId);
  }

  /**
   * Periodically messages updating.
   * @param {number} interval
   */
  intervalUpdate(interval) {
    this.updateMessages();
    this.timerId = setTimeout(() => {
      this.intervalUpdate.call(this, interval);
    }, interval);
  }

  /**
   * Get actual messages from the serber and update messages list.
   */
  updateMessages() {
    serverRequest
      .getAllMessages()
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
    serverRequest
      .messageAdd(message)
      .then(() => {
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
    serverRequest
      .messageDelete(messageId)
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
    this.startIntervalUpdate();
  }
}

window.App = App;
