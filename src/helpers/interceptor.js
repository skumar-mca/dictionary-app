import axios from "axios";
import * as lodash from "lodash";
import commonActions from "./common.actions";

const SilentRequestURLs = [
  '/v1/gifs/search',
  'silent=1',
];

const IgnoreResponseInterceptorForThisList = [
  '/download/'
];

const isSilentAPICall = (url) => {
  const isSilentURL = lodash.find(SilentRequestURLs, (itm) => {
    return url.indexOf(itm) > -1;
  });

  return isSilentURL != null
}

const isIgnoreURL = (url) => {
  const isIgnoreURL = lodash.find(IgnoreResponseInterceptorForThisList, (itm) => {
    return url.indexOf(itm) > -1;
  });

  return isIgnoreURL != null
}

let currentRequests = 0;
const setupInterceptors = store => {
  // Request Interceptor
  axios.interceptors.request.use(config => {
    const isSilectURL = isSilentAPICall(config.url);
    if (!isSilectURL) {
      currentRequests++;
      store.dispatch(commonActions.setLoader(true));
    }

    return new Promise((resolve, reject) => {
      config.headers.Authorization = `Token 35fc545ff94ce38457b0e1b126e1cc1c2c65324b`;
      //config.headers.uniquerequestid = utilCommon.generateUUID();
      //config.headers.timezoneoffset = new Date().getTimezoneOffset()
      resolve(config)
    });

  });

  // Response Interceptor
  axios.interceptors.response.use(
    response => {
      const isSilectURL = isSilentAPICall(response.config.url);
      if (!isSilectURL) {
        currentRequests--;
        if (currentRequests <= 0) {
          store.dispatch(commonActions.setLoader(false));
        }
      }

      if (isIgnoreURL(response.config.url)) {
        return response;
      }

      if (response && response.data) {
        // Strip out )]} string, is response is string. This is done to prevent XSS attacks.
        if (lodash.isString(response.data)) {
          // Parse JSON for security
          let updateData = response.data.replace(")]}", "");
          response.data = JSON.parse(updateData);
        }
      }
      return response;
    },
    error => {
      currentRequests = 0;
      const status = error.response ? error.response.status : null;
      if (lodash.includes([401, 451], status)) {
        let msg = '';
        switch (status) {
          default: msg = 'Session expired, please login again.';
        }

        store.dispatch(commonActions.setLoader(false));
        return Promise.reject(error);
      }

      const isSilectURL = isSilentAPICall(lodash.get(error, 'config.url', ''));
      if (!isSilectURL) {
        store.dispatch(commonActions.setLoader(false));
      }
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;

