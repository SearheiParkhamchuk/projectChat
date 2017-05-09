(() => {
  'use strict';

  class User {

    constructor({ el, Notice }) {
      this.el = el;
      this.initEvents();
      this.Notice = Notice;
    }

    /**
     * Init the user events.
     */
    initEvents() {
      this.el.addEventListener('click', this.onClick.bind(this));
      this.el.addEventListener('submit', this.login.bind(this));
    }

    /**
     * Get the username.
     * @returns {string}
     */
    getUsername() {
      return this.user ? this.user.username : 'Anonimous';
    }

    /**
     * Collect submitted data as object with pairs {name: value, ...}
     * @returns {Object}
     */
    getInputData() {
      const names = this.el.querySelectorAll('[name]');
      const data = {};
      this.Notice.clearNotices();
      names.forEach((el) => {
        if (el.value.length) {
          data[el.name] = el.value;
        } else {
          new this.Notice({
            el,
            message: `Укажите ${el.placeholder}`,
            className: 'notice-error',
          });
        }
      });
      return data;
    }

    /**
     * OnClick event callback.
     * @param event
     */
    onClick(event) {
      event.preventDefault();
      const action = event.target.dataset.action;
      if (action && this[action]) {
        this[action]();
      }
    }

    /**
     * Logout user.
     */
    logout() {
      delete (this.user);
      this.render();
    }

    /**
     * Check user auth data and login if correct.
     */
    login(event) {
      if (event) {
        event.preventDefault();
      }
      const data = this.getInputData();
      if (!data.login || !data.password) {
        return;
      }

      // TODO: do server auth

      if (data.login === 'testuser' && data.password === '12345') {
        this.user = {
          id: 123,
          username: data.login,
        };
        this.render();
      } else {
        this.Notice.clearNotices();
        new this.Notice({
          el: this.el.querySelector('[name=login]'),
          message: 'Пользователь с указанным именем и паролем не найдён.',
          className: 'notice-error',
        });
      }
    }

    /**
     * Check user auth data, register and login if correct.
     */
    register() {
      const data = this.getInputData();
      if (!data.login || !data.password) {
        return;
      }

      // TODO: do server auth

      this.user = {
        id: Math.random(),
        username: data.login,
      };
      this.render();
    }

    /**
     * Render the user data block.
     */
    render() {
      this.el.innerHTML = this.user
        ? `
        <form class="login-form">
          <span class="user">Здравствуйте, <span class="user__username">${this.user.username}</span></span>
          <input type="submit" value="Выйти" data-action="logout" class="button login-form__button" />
        </form>
        `
        : `
        <form class="login-form">
          <input name="login" placeholder="Имя" class="input login-form__input" />
          <input name="password" placeholder="Пароль" type="password" class="input login-form__input" />
          <input type="submit" value="Войти" data-action="login" class="button login-form__button" />
          <input type="submit" value="Регистрация" data-action="register" class="button login-form__button" />
        </form>
        `;
    }
  }

  //export
  window.User = User;
})();
