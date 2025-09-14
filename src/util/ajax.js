/* global File, Blob */

import { AdsBypasserError, map, forEach, none } from 'util/core.js';
import { GMAPI } from 'util/platform.js';
import { debug } from 'util/logger.js';

class AjaxError extends AdsBypasserError {
  constructor(method, url, data, headers, status, response) {
    super(`${method} ${url} got ${status}`);
    this._method = method;
    this._url = url;
    this._data = data;
    this._headers = headers;
    this._status = status;
    this._response = response;
  }

  get name() {
    return 'AjaxError';
  }

  get method() { return this._method; }
  get url() { return this._url; }
  get data() { return this._data; }
  get headers() { return this._headers; }
  get status() { return this._status; }
  get response() { return this._response; }
}

function* flattenObject(object) {
  if (!object) return;
  for (const [k, v] of Object.entries(object)) {
    if (Array.isArray(v)) {
      for (const v_ of v) yield [[k, ''], v_];
    } else if (typeof v === 'object') {
      for (const [k_, v_] of flattenObject(v)) yield [[k, ...k_], v_];
    } else {
      yield [[k], v];
    }
  }
}

function flattenKey(keyList) {
  const [head, ...rest] = keyList;
  return `${head}${rest.map(_ => `[${_}]`)}`;
}

function deepJoin(prefix, object) {
  const keys = Object.getOwnPropertyNames(object);
  const mapped = map(keys, k => {
    const v = object[k];
    const key = `${prefix}[${k}]`;
    if (typeof v === 'object') return deepJoin(key, v);
    return [key, v].map(encodeURIComponent).join('=');
  });
  return mapped.join('&');
}

function toQuery(data) {
  const type = typeof data;
  if (data === null || (type !== 'string' && type !== 'object')) return '';
  if (type === 'string') return data;
  if (data instanceof String) return data.toString();

  const keys = Object.getOwnPropertyNames(data);
  return map(keys, k => {
    const v = data[k];
    if (typeof v === 'object') return deepJoin(k, v);
    return [k, v].map(encodeURIComponent).join('=');
  }).join('&');
}

function toForm(data) {
  const type = typeof data;
  if (data === null || (type !== 'string' && type !== 'object')) return '';
  if (type === 'string') return data;
  if (data instanceof String) return data.toString();

  const form = new FormData();
  for (const [k, v] of flattenObject(data)) {
    form.append(flattenKey(k), v);
  }
  return form;
}

function ajax(method, url, data, headers) {
  debug('ajax', method, url, data, headers);

  const l = document.createElement('a');
  l.href = url;
  const reqHost = l.hostname;
  const overrideHeaders = {
    Host: reqHost || window.location.host,
    Origin: window.location.origin,
    Referer: window.location.href,
    'X-Requested-With': 'XMLHttpRequest'
  };

  forEach(overrideHeaders, (v, k) => {
    if (headers[k] === none) {
      delete headers[k];
    } else {
      headers[k] = v;
    }
  });

  if (data) {
    if (headers['Content-Type']?.indexOf('json') >= 0) {
      data = JSON.stringify(data);
    } else if (headers['Content-Type']?.indexOf('multipart') >= 0) {
      data = toForm(data);
    } else {
      data = toQuery(data);
    }
    headers['Content-Length'] = data.length;
  }

  return new Promise((resolve, reject) => {
    GMAPI.xmlHttpRequest({
      method,
      url,
      data,
      headers,
      onload(response) {
        response = typeof response.responseText !== 'undefined' ? response : this;
        if (response.status !== 200) {
          reject(new AjaxError(method, url, data, headers, response.status, response.responseText));
        } else {
          resolve(response.responseText);
        }
      },
      onerror(response) {
        response = typeof response.responseText !== 'undefined' ? response : this;
        reject(new AjaxError(method, url, data, headers, response.status, response.responseText));
      }
    });
  });
}

function get(url, data, headers) {
  data = toQuery(data);
  data = data ? `?${data}` : '';
  headers = headers || {};
  return ajax('GET', url + data, '', headers);
}

function post(url, data, headers) {
  const h = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };
  if (headers) forEach(headers, (v, k) => { h[k] = v; });
  return ajax('POST', url, data, h);
}

export { get, post };
