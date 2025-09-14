import { AjaxError, map, forEach, none } from 'util/core.js';
import { GMAPI } from 'util/platform.js';
import { debug } from 'util/logger.js';

function* flattenObject(object) {
  if (!object) return;
  for (const [k, v] of Object.entries(object)) {
    if (Array.isArray(v)) {
      for (const v_ of v) {
        yield [[k, ''], v_];
      }
    } else if (typeof v === 'object' && v !== null) {
      for (const [k_, v_] of flattenObject(v)) {
        yield [[k, ...k_], v_];
      }
    } else {
      yield [[k], v];
    }
  }
}

function flattenKey(keyList) {
  const [head, ...rest] = keyList;
  return `${head}${rest.map((_) => `[${_}]`)}`;
}

function deepJoin(prefix, object) {
  const keys = Object.getOwnPropertyNames(object);
  const mapped = map(keys, (k) => {
    const v = object[k];
    const key = `${prefix}[${k}]`;
    if (v && typeof v === 'object') {
      return deepJoin(key, v);
    }
    return [encodeURIComponent(key), encodeURIComponent(v)].join('=');
  });
  return mapped.join('&');
}

function toQuery(data) {
  if (data === null || (typeof data !== 'object' && typeof data !== 'string')) return '';
  if (typeof data === 'string' || data instanceof String) return data.toString();

  const keys = Object.getOwnPropertyNames(data);
  return map(keys, (k) => {
    const v = data[k];
    if (v && typeof v === 'object') return deepJoin(k, v);
    return [encodeURIComponent(k), encodeURIComponent(v)].join('=');
  }).join('&');
}

function toForm(data) {
  if (data === null || (typeof data !== 'object' && typeof data !== 'string')) return '';
  if (typeof data === 'string' || data instanceof String) return data.toString();

  const form = new FormData();
  for (const [k, v] of flattenObject(data)) {
    // Fix: handle File properly
    if (v instanceof File || v instanceof Blob || typeof v === 'string' || typeof v === 'number') {
      form.append(flattenKey(k), v);
    } else {
      form.append(flattenKey(k), JSON.stringify(v));
    }
  }
  return form;
}

function ajax(method, url, data, headers = {}) {
  debug('ajax', method, url, data, headers);

  const l = document.createElement('a');
  l.href = url;
  const reqHost = l.hostname;
  const overrideHeaders = {
    Host: reqHost || window.location.host,
    Origin: window.location.origin,
    Referer: window.location.href,
    'X-Requested-With': 'XMLHttpRequest',
  };

  forEach(overrideHeaders, (v, k) => {
    if (headers[k] === none) {
      delete headers[k];
    } else {
      headers[k] = v;
    }
  });

  if (data) {
    if (headers['Content-Type']?.includes('json')) {
      data = JSON.stringify(data);
    } else if (headers['Content-Type']?.includes('multipart')) {
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
      },
    });
  });
}

function get(url, data, headers = {}) {
  data = toQuery(data);
  const query = data ? `?${data}` : '';
  return ajax('GET', url + query, '', headers);
}

function post(url, data, headers = {}) {
  const h = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', ...headers };
  return ajax('POST', url, data, h);
}

export { get, post, toForm, toQuery, flattenObject };
