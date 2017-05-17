/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(14).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chat_css__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chat_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__chat_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_tmpl_pug__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_tmpl_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__message_tmpl_pug__);



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
    return __WEBPACK_IMPORTED_MODULE_1__message_tmpl_pug___default()({
      id: messageId,
      isOwn: this.currentUser.userId === message.userId,
      username: message.username || this.currentUser.defaultUsername,
      avatarUrl: message.avatarUrl || this.currentUser.defaultAvatarUrl,
      date: new Date(message.date),
      text: message.message,
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Chat);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messageForm_css__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messageForm_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__messageForm_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__form_tmpl_pug__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__form_tmpl_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__form_tmpl_pug__);



class MessageForm {

  constructor({ el }) {
    this.el = el;
    this.initEvents();
  }

  /**
   * Init the message events.
   */
  initEvents() {
    this.el.addEventListener('submit', this.messageSubmit.bind(this));
    this.el.addEventListener('keydown', this.keyDown.bind(this));
  }

  /**
   * Set event handler.
   */
  on(event, handler) {
    this.el.addEventListener(event, handler);
  }

  /**
   * Get submitted message and then clear the element value.
   * @returns {string}
   */
  getMessage() {
    if (!this.inputEl) {
      this.inputEl = this.el.querySelector('[name="message"]');
    }
    const message = this.inputEl.value;
    this.inputEl.value = '';
    return message;
  }

  /**
   * KeyDown event handler
   * @param {Event} event
   */
  messageSubmit(event) {
    event.preventDefault();
    const message = this.getMessage();
    if (!message) {
      return;
    }
    const onSubmitEvent = new CustomEvent('messageSubmit', { detail: { message } });
    this.el.dispatchEvent(onSubmitEvent);
  }

  /**
   * Message submit handler
   * @param {Event} event
   */
  keyDown(event) {
    if (event.which !== 13 || event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) {
      return;
    }
    event.preventDefault();
    this.messageSubmit(event);
  }

  /**
   * Render the message form block.
   */
  render() {
    this.el.innerHTML = __WEBPACK_IMPORTED_MODULE_1__form_tmpl_pug___default()();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MessageForm);



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_css__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__user_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_tmpl_pug__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_tmpl_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__user_tmpl_pug__);



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
    this.el.innerHTML = __WEBPACK_IMPORTED_MODULE_1__user_tmpl_pug___default()(this);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (User);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (HttpRequest);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Storage {

  constructor() {
    this.storage = window.localStorage;
  }

  getItem(key) {
    return this.storage.getItem(key);
  }

  setItem(key, value) {
    return this.storage.setItem(key, value);
  }

  removeItem(key) {
    return this.storage.removeItem(key);
  }

  clear() {
    return this.storage.clear();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Storage);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_css__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_httpRequest__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chat_chat__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__messageForm_messageForm__ = __webpack_require__(2);







const serverRequest = new __WEBPACK_IMPORTED_MODULE_2__modules_httpRequest__["a" /* default */]('https://mevlchat.firebaseio.com');
const UPDATE_MESSAGES_INTERVAL = 3000;

class App {

  constructor({ userEl, messageFormEl, chatEl }) {
    this.user = new __WEBPACK_IMPORTED_MODULE_4__user_user__["a" /* default */]({ el: userEl, Storage: __WEBPACK_IMPORTED_MODULE_1__modules_storage__["a" /* default */] });
    this.chat = new __WEBPACK_IMPORTED_MODULE_3__chat_chat__["a" /* default */]({ el: chatEl, currentUser: this.user });
    this.messageForm = new __WEBPACK_IMPORTED_MODULE_5__messageForm_messageForm__["a" /* default */]({ el: messageFormEl });
    this.initEvents();
  }

  /**
   * Init the application events.
   */
  initEvents() {
    this.messageForm.on('messageSubmit', this.messageSubmit.bind(this));
    this.chat.on('messageDelete', this.deleteMessage.bind(this));
    // document.addEventListener('visibilitychange', () => {
    //   if (document.visibilityState === 'hidden') {
    //     this.stopIntervalUpdate();
    //   } else {
    //     this.startIntervalUpdate();
    //   }
    // });
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
    this.updateMessages();
//      this.startIntervalUpdate();
  }
}

window.App = App;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (avatarUrl, date, id, isOwn, text, username) {pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes(["chat__message",isOwn ? 'chat__message_own' : ''], [false,true]), false, true)+pug.attr("id", id, true, true)) + "\u003E\u003Cdiv class=\"chat__message_avatar\"\u003E\u003Cimg" + (pug.attr("src", avatarUrl, true, true)+pug.attr("alt", username, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"chat__message_header\"\u003E\u003Cspan class=\"chat__message_author\"\u003E" + (pug.escape(null == (pug_interp = username) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cinput class=\"chat__message_button\" type=\"button\" value=\"x\"\u003E\u003Cspan class=\"chat__message_date\"\u003E" + (pug.escape(null == (pug_interp = date.toLocaleString('ru', { hour: '2-digit', minute: '2-digit' })) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"chat__message_text\"\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";}.call(this,"avatarUrl" in locals_for_with?locals_for_with.avatarUrl:typeof avatarUrl!=="undefined"?avatarUrl:undefined,"date" in locals_for_with?locals_for_with.date:typeof date!=="undefined"?date:undefined,"id" in locals_for_with?locals_for_with.id:typeof id!=="undefined"?id:undefined,"isOwn" in locals_for_with?locals_for_with.isOwn:typeof isOwn!=="undefined"?isOwn:undefined,"text" in locals_for_with?locals_for_with.text:typeof text!=="undefined"?text:undefined,"username" in locals_for_with?locals_for_with.username:typeof username!=="undefined"?username:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cform class=\"message-form\"\u003E\u003Ctextarea class=\"message-form__input\" name=\"message\" placeholder=\"Сообщение...\"\u003E\u003C\u002Ftextarea\u003E\u003Cinput class=\"button message-form__button input_button\" type=\"submit\" value=\"&gt;\"\u003E\u003C\u002Fform\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (avatarUrl, username) {pug_html = pug_html + "\u003Cdiv class=\"user\"\u003E\u003Ch1 class=\"user__username toggle toggled\" data-toggle=\"username\"\u003E" + (pug.escape(null == (pug_interp = username) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003Cform class=\"user-form user-form__username hidden\" data-action=\"setUsername\"\u003E\u003Cinput class=\"user__input user__input_username\" name=\"username\" placeholder=\"Укажите имя\"\u003E\u003Cinput class=\"user__input user__input_button input_button\" type=\"submit\" value=\"&gt;\"\u003E\u003C\u002Fform\u003E\u003Cform class=\"user-form user-form__avatar hidden\" data-action=\"setAvatar\"\u003E\u003Cinput class=\"user__input user__input_avatar\" name=\"avatarUrl\" placeholder=\"URL аватары\"\u003E\u003Cinput class=\"user__input user__input_button input_button\" type=\"submit\" value=\"&gt;\"\u003E\u003C\u002Fform\u003E\u003Cfigure class=\"user__avatar\"\u003E\u003Cimg" + (" class=\"toggle\""+" data-toggle=\"avatar\""+pug.attr("src", avatarUrl, true, true)+pug.attr("alt", username, true, true)) + "\u003E\u003C\u002Ffigure\u003E\u003C\u002Fdiv\u003E";}.call(this,"avatarUrl" in locals_for_with?locals_for_with.avatarUrl:typeof avatarUrl!=="undefined"?avatarUrl:undefined,"username" in locals_for_with?locals_for_with.username:typeof username!=="undefined"?username:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);