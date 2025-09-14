import { AdsBypasserError, none, forEach } from 'util/core.js';
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

  get name() { return 'AjaxError'; }
  get method() { return this._method; }
  get url() { return this._url; }
  get data() { return this._data; }
  get headers() { return this._headers; }
  get status() { return this._status; }
  get response() { return this._response; }
}

// -----------------------------
// Flatten nested objects
// -----------------------------
function* flattenObject(obj, prefix = []) {
  if (!obj) return;
  for (const [k, v] of Object.entries(obj)) {
    const keys = [...prefix, k];
    if (v && typeof v === 'object' && !Array.isArray(v) && !(v instanceof File)) {
      yield* flattenObject(v, keys);
    } else if (Array.isArray(v)) {
      for (const item of v) yield [[...keys, ''], item];
    } else {
      yield [keys, v];
    }
  }
}

function flattenKey(keys) {
  const [head, ...rest] = keys;
  return head + rest.map(k => `[${k}]`).join('');
}

function toQuery(data) {
  if (!data) return '';
  if (typeof data === 'string' || data instanceof String) return data.toString();

  const pairs = [];
  for (const [keys, value] of flattenObject(data)) {
    pairs.push(`${encodeURIComponent(flattenKey(keys))}=${encodeURIComponent(value)}`);
  }
  return pairs.join('&');
}

function toForm(data) {
  if (!data) return '';
  if (typeof data === 'string' || data instanceof String) return data.toString();

  const form = new FormData();
  for (const [keys, value] of flattenObject(data)) {
    form.append(flattenKey(keys), value);
  }
  return form;
}

// -----------------------------
// AJAX request
// -----------------------------
function ajax(method, url, data, headers = {}) {
  debug('ajax', method, url, data, headers);

  const l = document.createElement('a');
  l.href = url;
  const reqHost = l.hostname || window.location.host;

  const overrideHeaders = {
    Host: reqHost,
    Origin: window.location.origin,
    Referer: window.location.href,
    'X-Requested-With': 'XMLHttpRequest',
  };

  forEach(overrideHeaders, (v, k) => {
    if (headers[k] === none) delete headers[k];
    else headers[k] = v;
  });

  if (data) {
    const contentType = headers['Content-Type'] || '';
    if (contentType.includes('json')) data = JSON.stringify(data);
    else if (contentType.includes('multipart')) data = toForm(data);
    else data = toQuery(data);

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
      },
    });
  });
}

function get(url, data, headers) {
  const query = toQuery(data);
  return ajax('GET', url + (query ? `?${query}` : ''), '', headers || {});
}

function post(url, data, headers) {
  const h = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', ...headers };
  return ajax('POST', url, data, h);
}

export { get, post };
