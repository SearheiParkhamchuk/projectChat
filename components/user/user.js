(() => {
  'use strict';

  // import
  const userTemplate = window.userTemplate;

  const ANONIMOUS_USERNAME = 'Аноним';
  const DEFAULT_AVATAR = './components/user/noAvatar.jpg';

  /**
   * @typedef {Object} User
   * @property {string} userId
   * @property {string} username
   * @property {string} avatarUrl
   */

  class User {

    constructor({ el }) {
      this.el = el;
      this.initEvents();
      this.data = {
        userId: User.getCookie('userId') || `anonimous-${(Math.random() * 1000000000).toFixed()}`,
        username: User.getCookie('username') || undefined,
        avatarUrl: User.getCookie('avatarUrl') || undefined,
      };
      this.setUserCookies();
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
     * Set current user settings to cookies.
     */
    setUserCookies() {
      User.setCookie('userId', this.data.userId);
      if (this.data.username) {
        User.setCookie('username', this.data.username);
      } else {
        User.setCookie('username', '', { expires: -1 });
      }
      if (this.data.avatarUrl) {
        User.setCookie('avatarUrl', this.data.avatarUrl);
      } else {
        User.setCookie('avatarUrl', '', { expires: -1 });
      }
    }

    /**
     * Get cookie by a name.
     * @param {string} name
     * @returns {*}
     */
    static getCookie(name) {
      const matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    /**
     * Set cookie.
     * @param {string} name
     * @param {string} value
     * @param {Object} options
     */
    static setCookie(name, value, options = {}) {
      const defaultOptions = {
        expires: 86400,
      };
      options = Object.assign({}, defaultOptions, options);
      let expires = options.expires;
      if (typeof expires === 'number' && expires) {
        const expDate = new Date();
        expDate.setTime(expDate.getTime() + (expires * 1000));
        expires = options.expires = expDate;
      }
      if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
      }
      let updatedCookie = `${name}=${encodeURIComponent(value)}`;
      for (const propName in options) {
        updatedCookie += `; ${propName}`;
        if (options[propName] !== true) {
          updatedCookie += `=${options[propName]}`;
        }
      }
      document.cookie = updatedCookie;
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
      this.setUserCookies();
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
      this.setUserCookies();
      this.render();
    }

    /**
     * Render the user data block.
     */
    render() {
      this.el.innerHTML = `
        <div class="user">
            <h1 class="user__username toggle toggled" data-toggle="username">${this.username}</h1>
            <form class="user-form user-form__username hidden" data-action="setUsername">
                <input name="username" placeholder="Укажите имя" class="user__input user__input_username" />
                <input type="submit" class="user__input user__input_button input_button" value=">" />
            </form>
            <form class="user-form user-form__avatar hidden" data-action="setAvatar">
                <input name="avatarUrl" placeholder="URL аватары" class="user__input user__input_avatar" />
                <input type="submit" class="user__input user__input_button input_button" value=">" />
            </form>
            <figure class="user__avatar">
                <img class="toggle" data-toggle="avatar" src="${this.avatarUrl}" alt="${this.username}"/>
            </figure>
        </div>
      `;
    }
  }

  //export
  window.User = User;
})();
