class HttpRequest {

  constructor(serverUrl) {
    this.serverUrl = serverUrl;
  }

  sendRequest({type = 'GET', path, data = {}}) {
    const request = new XMLHttpRequest();
    request.open(type, `${this.serverUrl}/${path}`, true);
    return new Promise((resolve, reject) => {
      request.addEventListener('load', () => {
        resolve(JSON.parse(request.responseText));
      });
      request.addEventListener('error', (event) => {
        const error = new Error(event.target.statusText);
        error.code = event.target.status;
        reject(error);
      });
      request.send(JSON.stringify(data));
    });
  }

  /**
   * Get all messages.
   */
  getAllMessages() {
    return this.sendRequest({
      path: 'messages.json',
    });
  }

  /**
   * Get the message by messageId.
   * @param {string} messageId
   */
  getMessage(messageId) {
    return this.sendRequest({
      path: `messages/${messageId}.json`,
    });
  }

  /**
   * Update the message by messageId.
   * @param {string} messageId
   * @param {ChatMessage} message
   * @returns {Promise}
   */
  messageUpdate(messageId, message) {
    return this.sendRequest({
      type: 'PUT',
      path: `messages/${messageId}.json`,
      data: message,
    });
  }

  /**
   * Send a new message.
   * @param {ChatMessage} message
   * @returns {Promise}
   */
  messageAdd(message) {
    return this.sendRequest({
      type: 'POST',
      path: 'messages.json',
      data: message,
    });
  }

  /**
   * Delete the message by messageId.
   * @param {string} messageId
   * @returns {Promise}
   */
  messageDelete(messageId) {
    return this.sendRequest({
      type: 'DELETE',
      path: `messages/${messageId}.json`,
    });
  }
}

export default HttpRequest;
