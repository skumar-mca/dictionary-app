import * as lodash from 'lodash';
import moment from "moment";
import CacheManager from './cache-manager';
import { DATE_FORMAT, MAX_CACHED_ITEMS, SAVED_SEARCH } from './constants';
export const splitPascalString = str => {
  return (str || "").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
};

export const formattedDate = (dt, format) => {
  if (!dt) {
    return "";
  }

  format = format || DATE_FORMAT;
  return moment(dt).format(format);
};


export const slugify = (text) => {
  return (text || '')
    .toString()                     // Cast to string
    .toLowerCase()                  // Convert the string to lowercase letters
    .trim()                         // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/\//g, '-')           // Replace / with -
    .replace(/&/g, '-and-')           // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, "") // trim - from end of text
}

export const copyToClipboard = (copyText, cb) => {
  copyToClip(copyText);
  cb(true);
}

const copyToClip = (str) => {
  function listener(e) {
    e.clipboardData.setData("text/html", str);
    e.clipboardData.setData("text/plain", str);
    e.preventDefault();
  }
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
};


export const ManageSearchResult = {
  add: (searchTerm, result) => {
    const savedSearches = CacheManager.getItem(SAVED_SEARCH, []);
    const existingIndex = lodash.findIndex(savedSearches, itm => itm.key === searchTerm);

    const content = {
      key: searchTerm,
      result: result,
      timeStamp: new Date()
    };

    if (existingIndex === -1) {
      if ((savedSearches || []).length >= MAX_CACHED_ITEMS) {
        savedSearches.shift();
      }
      savedSearches.push(content);
    }
    else {
      savedSearches[existingIndex] = content;
    }

    CacheManager.setItem(SAVED_SEARCH, savedSearches);
  },
  remove: (searchTerm) => {
    const savedSearches = CacheManager.getItem(SAVED_SEARCH, []);
    const existingIndex = lodash.findIndex(savedSearches, itm => itm.key === searchTerm);
    if (existingIndex > -1) {
      savedSearches.splice(existingIndex, 1);
      CacheManager.setItem(SAVED_SEARCH, savedSearches);
    }
  },
  get: (searchTerm) => {
    const savedSearches = CacheManager.getItem(SAVED_SEARCH, []);
    const existingIndex = lodash.findIndex(savedSearches, itm => itm.key === searchTerm);
    if (existingIndex > -1) {
      return savedSearches[existingIndex];
    }

    return null;
  }
}
