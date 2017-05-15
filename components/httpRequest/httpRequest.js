(() => {
  'use strict';

  const SERVER_URL = 'https://mevlchat.firebaseio.com';
  const SERVER_AUTH_TOKEN = 'auth_token';

  class HttpRequest {

    constructor({ type = 'GET', path }) {
      this.request = new XMLHttpRequest();
      this.request.open(type, `${SERVER_URL}/${path}`, true);
    }

    send(data = {}) {
      return new Promise((resolve, reject) => {
        this.request.addEventListener('load', event => {
          resolve(JSON.parse(this.request.responseText));
        });
        this.request.addEventListener('error', event => {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        });
        this.request.send(JSON.stringify(data));
      });
    }
  }

  // export
  window.HttpRequest = HttpRequest;
})();
