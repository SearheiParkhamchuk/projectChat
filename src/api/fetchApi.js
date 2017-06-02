import { SERVER_BASE_URL } from '../constants/fetchApi';

export default (url, options = {}) => {
  const fullUrl = (url.indexOf(SERVER_BASE_URL) === -1) ? SERVER_BASE_URL + url : url;

  return fetch(fullUrl, options)
    .then(response =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
};
