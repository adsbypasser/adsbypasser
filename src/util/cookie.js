import {
  none,
  forEach,
  find,
} from 'util/core';


function setCookie (key, value) {
  document.cookie = `${key}=${value};path=${location.pathname};`;
}


function getCookie (key) {
  let [, c,] = find(document.cookie.split(';'), (v) => {
    const k = v.replace(/^\s*([a-zA-Z0-9-_]+)=.+$/, '$1');
    if (k !== key) {
      return none;
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

    document.cookie = `${k}=;expires=${d};`;
    document.cookie = `${k}=;path=/;expires=${d};`;
    const e = (a, b, c) => `${a}=;path=/;domain=${b};expires=${c};`;
    document.cookie = e(k, a, d);
    document.cookie = e(k, b, d);
    document.cookie = e(k, c, d);
  });
}


export {
  setCookie,
  getCookie,
  resetCookies,
};
