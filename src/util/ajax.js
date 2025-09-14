import { AdsBypasserError, map, forEach, none } from 'util/core.js';
import { GMAPI } from 'util/platform.js';
import { debug } from 'util/logger.js';

// -----------------------------
// Custom AjaxError
// -----------------------------
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

  get name() { return 'AjaxError'; }
  get method() { return this._method; }
  get url() { return this._url; }
  get data() { return this._data; }
  get headers() { return this._headers; }
  get status() { return this._status; }
  get response() { return this._response; }
}

// -----------------------------
// Object utilities
// -----------------------------
function* flattenObject(object) {
  if (!object) return;
  for (const [k, v] of Object.entries(object)) {
    if (Array.isArray(v)) {
      for (const item of v) yield [[k, ''], item];
    } else if (typeof v === 'object') {
      for (const [nestedKey, nestedVal] of flattenObject(v)) {
        yield [[k, ...nestedKey], nestedVal];
      }
    } else {
      yield [[k], v];
    }
  }
}

function flattenKey(keys) {
  const [head, ...rest] = keys;
  return `${head}${rest.map(k => `[${k}]`).join('')}`;
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

// -----------------------------
// Convert data to query string
// -----------------------------
function toQuery(data) {
  if (data === null || (typeof data !== 'string' && typeof data !== 'object')) return '';
  if (typeof data === 'string' || data instanceof String) return data.toString();

  const keys = Object.getOwnPropertyNames(data);
  return map(keys, k => {
    const v = data[k];
    if (typeof v === 'object') return deepJoin(k, v);
    return [k, v].map(encodeURIComponent).join('=');
  }).join('&');
}

// -----------------------------
// Convert data to FormData
// -----------------------------
function toForm(data) {
  if (data === null || (typeof data !== 'string' && typeof data !== 'object')) return '';
  if (typeof data === 'string' || data instanceof String) return data.toString();

  const form = new FormData();
  for (const [k, v] of flattenObject(data)) {
    form.append(flattenKey(k), v);
  }
  return form;
}

// -----------------------------
// Core AJAX request
// -----------------------------
function ajax(method, url, data, headers = {}) {
  debug('ajax', method, url, data, headers);

  // Ensure host headers
  const link = document.createElement('a');
  link.href = url;
  const reqHost = link.hostname;
  const overrideHeaders = {
    Host: reqHost || window.location.host,
    Origin: window.location.origin,
    Referer: window.location.href,
    'X-Requested-With': 'XMLHttpRequest',
  };

  forEach(overrideHeaders, (v, k) => {
    if (headers[k] === none) delete headers[k];
    else headers[k] = v;
  });

  // Handle payload
  if (data) {
    if ((headers['Content-Type'] || '').includes('json')) {
      data = JSON.stringify(data);
    } else if ((headers['Content-Type'] || '').includes('multipart')) {
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
        response = response.responseText !== undefined ? response : this;
        if (response.status !== 200) {
          reject(new AjaxError(method, url, data, headers, response.status, response.responseText));
        } else {
          resolve(response.responseText);
        }
      },
      onerror(response) {
        response = response.responseText !== undefined ? response : this;
        reject(new AjaxError(method, url, data, headers, response.status, response.responseText));
      },
    });
  });
}

// -----------------------------
// GET and POST helpers
// -----------------------------
function get(url, data, headers = {}) {
  const query = toQuery(data);
  const fullUrl = query ? `${url}?${query}` : url;
  return ajax('GET', fullUrl, '', headers);
}

function post(url, data, headers = {}) {
  const h = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', ...headers };
  return ajax('POST', url, data, h);
}

// -----------------------------
export { get, post };
