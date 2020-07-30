import axios from "axios";

export const Urls = {
  SearchWord: "/dictionary/:searchWord"
};

export const buildURL = (url, queryParam, paramReplacements) => {
  let API_URL = process.env.REACT_APP_API_URL;
  API_URL = API_URL || 'https://owlbot.info/api/v4';

  if (queryParam) {
    url = addQueryParameters(url, queryParam);
  }

  if (paramReplacements) {
    url = replaceParams(url, paramReplacements);
  }

  return API_URL + url;
};

const addQueryParameters = (url, params) => {
  const queryList = [];
  Object.keys(params).forEach(k => {
    queryList.push(`${k}=${encodeURIComponent(params[k])}`);
  });

  const prefixCharacter = url.indexOf("?") === -1 ? "?" : "&";

  return `${url + prefixCharacter + queryList.join("&")}`;
};

const replaceParams = (url, params) => {
  Object.keys(params).forEach(k => {
    url = url.replace(`:${k}`, encodeURIComponent(params[k]));
  });
  return url;
};

export const callAPI = (url, method, postData, cb) => {
  method = method || "get";
  axios[method](url, postData).then(
    res => {
      cb && cb(res.data);
    },
    err => {
      cb && cb(null);
    }
  );
};

export const downloadFile = (url, fileName, method, postData) => {
  axios.request({ url, method: method || 'get', data: postData, responseType: 'blob' })
    .then(({ data }) => {
      let a = document.createElement("a");
      let file = new Blob([data]);
      let fileURL = window.URL.createObjectURL(file);
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = fileURL;
      a.download = `${fileName}`;
      a.click();
    });
};

const exportToExcel = (tableHTMLData, fileName) => {
  let downloadurl;
  downloadurl = document.createElement("a");
  document.body.appendChild(downloadurl);

  let file = new Blob([tableHTMLData], { type: 'application/vnd.ms-excel' });
  let fileURL = window.URL.createObjectURL(file);
  let a = document.createElement("a");

  document.body.appendChild(a);
  a.style = "display: none";
  a.href = fileURL;
  a.download = `${fileName}.xlsx`;
  a.click();
}

export const downloadExcelReport = (url, fileName) => {
  axios.request({ url, method: 'get', responseType: 'blob' })
    .then(({ data }) => {
      exportToExcel(data, fileName);
    });
};
