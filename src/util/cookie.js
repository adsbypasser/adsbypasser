// -----------------------------
// Cookie Utility
// -----------------------------
import { none, forEach, find } from 'util/core.js';

function setCookie(key, value) {
  document.cookie = `${key}=${value};path=${location.pathname};`;
}

function getCookie(key) {
  const [, c] = find(document.cookie.split(';'), v => {
    const k = v.replace(/^\s*([a-zA-Z0-9-_]+)=.+$/, '$1');
    if (k !== key) return none;
  });
  if (c === none) return null;

  const match = c.replace(/^\s*[a-zA-Z0-9-_]+=([^;]+).?$/, '$1');
  return match || null;
}

function resetCookies() {
  const domainFull = document.domain;
  const domainNoWWW = domainFull.replace(/^www\./, '');
  const domainRoot = domainFull.replace(/^(\w+\.)+?(\w+\.\w+)$/, '$2');
  const expired = new Date(1e3).toUTCString();

  forEach(document.cookie.split(';'), v => {
    const k = v.replace(/^\s*(\w+)=.+$/, '$1');

    document.cookie = `${k}=;expires=${expired};`;
    document.cookie = `${k}=;path=/;expires=${expired};`;

    const cookieString = (key, dom, exp) => `${key}=;path=/;domain=${dom};expires=${exp};`;
    document.cookie = cookieString(k, domainFull, expired);
    document.cookie = cookieString(k, domainNoWWW, expired);
    document.cookie = cookieString(k, domainRoot, expired);
  });
}

export { setCookie, getCookie, resetCookies };
