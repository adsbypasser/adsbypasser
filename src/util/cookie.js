export {
  setCookie,
  getCookie,
  resetCookies,
};

import {
  none,
  template,
  forEach,
  find,
} from 'util/core';


function setCookie (key, value) {
  const now = new Date();
  now.setTime(now.getTime() + 3600 * 1000);
  const tpl = template('{0}={1};path={2};');
  document.cookie = tpl(key, value, window.location.pathname, now.toUTCString());
}


function getCookie (key) {
  let [, c,] = find(document.cookie.split(';'), (v) => {
    const k = v.replace(/^\s*([a-zA-Z0-9-_]+)=.+$/, '$1');
    if (k !== key) {
      return _.none;
    }
  });
  if (c === none) {
    return null;
  }
  c = c.replace(/^\s*[a-zA-Z0-9-_]+=([^;]+).?$/, '$1');
  if (!c) {
    return null;
  }
  return c;
}


function resetCookies () {
  const a = document.domain;
  const b = document.domain.replace(/^www\./, '');
  const c = document.domain.replace(/^(\w+\.)+?(\w+\.\w+)$/, '$2');
  const d = (new Date(1e3)).toUTCString();

  forEach(document.cookie.split(';'), (v) => {
    const k = v.replace(/^\s*(\w+)=.+$/, '$1');

    document.cookie = template('{0}=;expires={1};')(k, d);
    document.cookie = template('{0}=;path=/;expires={1};')(k, d);
    const e = template('{0}=;path=/;domain={1};expires={2};');
    document.cookie = e(k, a, d);
    document.cookie = e(k, b, d);
    document.cookie = e(k, c, d);
  });
}
