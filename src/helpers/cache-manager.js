const keyPrefix = "idict_";

const CacheManager = {
  isStringyfied: txt => {
    try {
      JSON.parse(txt);
      return true;
    } catch (e) {
      return false;
    }
  },
  getItem: (key, defaultValue) => {
    key = `${keyPrefix}${key}`;
    const val = window.localStorage.getItem(key);
    if (val) {
      return JSON.parse(val);
    }

    return defaultValue || null;
  },
  setItem: (key, value) => {
    key = `${keyPrefix}${key}`;

    if (!CacheManager.isStringyfied(value)) {
      value = JSON.stringify(value);
    }

    window.localStorage.setItem(key, value);
  },
  removeItem: key => {
    key = `${keyPrefix}${key}`;
    window.localStorage.removeItem(key);
  },
  clear: () => {
    window.localStorage.clear();
  }
};

export default CacheManager;
