import {
  AdsBypasserError,
  map,
  forEach,
  none,
} from 'util/core';
import {
  GMAPI,
} from 'util/platform';


class AjaxError extends AdsBypasserError {

  constructor (method, url, data, headers, status, response) {
    super(`${method} ${url} got ${status}`);

    this._method = method;
    this._url = url;
    this._data = data;
    this._headers = headers;
    this._status = status;
    this._response = response;
  }

  get name () {
    return 'AjaxError';
  }

  get method () {
    return this._method;
  }

  get url () {
    return this._url;
  }

  get data () {
    return this._data;
  }

  get headers () {
    return this._headers;
  }

  get status () {
    return this._status;
  }

  get response () {
    return this._response;
  }

}


function deepJoin (prefix, object) {
  const keys = Object.getOwnPropertyNames(object);
  const mapped = map(keys, (k) => {
    const v = object[k];
    const key = `${prefix}[${k}]`;
    if (typeof v === 'object') {
      return deepJoin(key, v);
    }
    const tmp = [key, v].map(encodeURIComponent);
    return tmp.join('=');
  });
  return mapped.join('&');
}


function toQuery (data) {
  const type = typeof data;
  if (data === null || (type !== 'string' && type !== 'object')) {
    return '';
  }
  if (type === 'string') {
    return data;
  }
  if (data instanceof String) {
    return data.toString();
  }
  const keys = Object.getOwnPropertyNames(data);
  return map(keys, (k) => {
    const v = data[k];
    if (typeof v === 'object') {
      return deepJoin(k, v);
    }
    const tmp = [k, v].map(encodeURIComponent);
    return tmp.join('=');
  }).join('&');
}


function ajax (method, url, data, headers) {
  // Host is not always the same as window.location.host, for example
  // foo.example.org can perform a request to example.org
  const l = document.createElement('a');
  l.href = url;
  const reqHost = l.hostname;
  const overrideHeaders = {
    Host: reqHost || window.location.host,
    Origin: window.location.origin,
    Referer: window.location.href,
    'X-Requested-With': 'XMLHttpRequest',
  };

  // Allow to perform a request without certain parameters by passsing _.none
  forEach(overrideHeaders, (v, k) => {
    if (headers[k] === none) {
      delete headers[k];
    } else {
      headers[k] = v;
    }
  });

  // deal with payload in POST
  if (data) {
    if (headers['Content-Type'].indexOf('json') >= 0) {
      data = JSON.stringify(data);
    } else {
      data = toQuery(data);
    }
    headers['Content-Length'] = data.length;
  }

  return new Promise((resolve, reject) => {
    GMAPI.xmlHttpRequest({
      method: method,
      url: url,
      data: data,
      headers: headers,
      onload (response) {
        // HACK use this as fallback for zombie.js
        response = (typeof response.responseText !== 'undefined') ? response : this;
        if (response.status !== 200) {
          reject(new AjaxError(method, url, data, headers, response.status, response.responseText));
        } else {
          resolve(response.responseText);
        }
      },
      onerror (response) {
        // HACK use this as fallback for zombie.js
        response = (typeof response.responseText !== 'undefined') ? response : this;
        reject(new AjaxError(method, url, data, headers, response.status, response.responseText));
      },
    });
  });
}


function get (url, data, headers) {
  data = toQuery(data);
  // Don't request with '?' if there is no data
  data = data ? '?' + data : '';
  headers = headers || {};
  return ajax('GET', url + data, '', headers);
}


function post (url, data, headers) {
  const h = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };
  if (headers) {
    forEach(headers, (v, k) => {
      h[k] = v;
    });
  }
  return ajax('POST', url, data, h);
}


export {
  get,
  post,
};
