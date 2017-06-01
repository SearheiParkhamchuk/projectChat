class StorageApi {
  static getStorage() {
    return window.localStorage;
  }

  static getItem(key) {
    return StorageApi.getStorage().getItem(key);
  }

  static setItem(key, value) {
    return StorageApi.getStorage().setItem(key, value);
  }

  static removeItem(key) {
    return StorageApi.getStorage().removeItem(key);
  }

  static clear() {
    return StorageApi.getStorage().clear();
  }
}

export default StorageApi;
