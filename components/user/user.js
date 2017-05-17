import styles from './user.css';
import userTemplate from './user.tmpl.pug';

const ANONIMOUS_USERNAME = 'Аноним';
const DEFAULT_AVATAR = './components/user/noAvatar.jpg';

/**
 * @typedef {Object} User
 * @property {string} userId
 * @property {string} username
 * @property {string} avatarUrl
 */

class User {

  constructor({ el, Storage }) {
    this.el = el;
    this.storage = new Storage();
    this.initEvents();
    this.data = {
      userId: this.storage.getItem('userId') || `anonimous-${(Math.random() * 1000000000).toFixed()}`,
      username: this.storage.getItem('username'),
      avatarUrl: this.storage.getItem('avatarUrl'),
    };
    this.saveUserToStorage();
  }

  /**
   * Init the user events.
   */
  initEvents() {
    this.el.addEventListener('click', this.click.bind(this));
    this.el.addEventListener('submit', this.submit.bind(this));
  }

  /**
   * Get the user ID.
   * @returns {string}
   */
  get userId() {
    return this.data.userId;
  }

  /**
   * Set the user ID by a username.
   * @param {string} username
   */
  set userId(username) {
    if (username) {
      this.data.userId = username.toLowerCase();
    }
  }

  /**
   * Get the username.
   * @returns {string}
   */
  get username() {
    return this.data.username || ANONIMOUS_USERNAME;
  }

  /**
   * Get default username.
   * @returns {string}
   */
  get defaultUsername() {
    return ANONIMOUS_USERNAME;
  }

  /**
   * Get the user avatar URL.
   * @returns {string}
   */
  get avatarUrl() {
    return this.data.avatarUrl || DEFAULT_AVATAR;
  }

  /**
   * Get default avatar URL.
   * @returns {string}
   */
  get defaultAvatarUrl() {
    return DEFAULT_AVATAR;
  }

  /**
   * Set current user settings to storage.
   */
  saveUserToStorage() {
    this.storage.setItem('userId', this.data.userId);
    if (this.data.username) {
      this.storage.setItem('username', this.data.username);
    } else {
      this.storage.removeItem('username');
    }
    if (this.data.avatarUrl) {
      this.storage.setItem('avatarUrl', this.data.avatarUrl);
    } else {
      this.storage.removeItem('avatarUrl');
    }
  }

  /**
   * Submit event handler.
   * @param {Event} event
   */
  submit(event) {
    event.preventDefault();
    if (
      event.target.classList.contains('user-form') &&
      event.target.dataset.action &&
      this[event.target.dataset.action]
    ) {
      this[event.target.dataset.action](event);
    }
  }

  /**
   * Click event handler.
   * @param {Event} event
   */
  click(event) {
    if (event.target.classList.contains('toggle') && event.target.dataset.toggle) {
      event.preventDefault();
      this.el.querySelector('[name=username]').value = this.username;
      this.el.querySelector('[name=avatarUrl]').value = this.data.avatarUrl || '';
      this.el.querySelector(`.user .user-form__${event.target.dataset.toggle}`).classList.toggle('hidden');
      if (event.target.classList.contains('toggled')) {
        event.target.hidden = true;
      }
    }
  }

  /**
   * Set user avatar.
   * @param {Event} event
   */
  setAvatar(event) {
    const el = event.target.querySelector('[name=avatarUrl]');
//      if (el && el.value && el.value.match(/.(jpg|jpeg|png|gif)$/i)) {
    if (el && el.value) {
      this.data.avatarUrl = el.value;
    }
    this.saveUserToStorage();
    this.render();
  }

  /**
   * Set username.
   * @param {Event} event
   */
  setUsername(event) {
    const el = event.target.querySelector('[name=username]');
    if (el && el.value) {
      this.data.username = el.value;
      this.userId = el.value;
    }
    this.saveUserToStorage();
    this.render();
  }

  /**
   * Render the user data block.
   */
  render() {
    this.el.innerHTML = userTemplate(this);
  }
}

export default User;
