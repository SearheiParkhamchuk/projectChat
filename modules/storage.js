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

export default Storage;
