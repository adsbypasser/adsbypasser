import { none, forEach, find } from 'util/core.js';

// -----------------------------
// Set a cookie
// -----------------------------
function setCookie(key, value) {
  document.cookie = `${key}=${value};path=${location.pathname};`;
}

// -----------------------------
// Get a cookie
// -----------------------------
function getCookie(key) {
  const [, c] = find(document.cookie.split(';'), v => {
    const k = v.replace(/^\s*([a-zA-Z0-9-_]+)=.+$/, '$1');
    if (k !== key) return none;
  });

  if (c === none) return null;

  const value = c.replace(/^\s*[a-zA-Z0-9-_]+=([^;]+).?$/, '$1');
  return value || null;
}

// -----------------------------
// Reset all cookies for domain variants
// -----------------------------
function resetCookies() {
  const domainFull = document.domain;
  const domainNoWWW = document.domain.replace(/^www\./, '');
  const domainRoot = document.domain.replace(/^(\w+\.)+?(\w+\.\w+)$/, '$2');
  const expires = new Date(1e3).toUTCString();

  const set = (k, d, exp) => `${k}=;path=/;domain=${d};expires=${exp};`;

  forEach(document.cookie.split(';'), v => {
    const key = v.replace(/^\s*(\w+)=.+$/, '$1');

    // Delete with various paths/domains
    document.cookie = `${key}=;expires=${expires};`;
    document.cookie = `${key}=;path=/;expires=${expires};`;
    document.cookie = set(key, domainFull, expires);
    document.cookie = set(key, domainNoWWW, expires);
    document.cookie = set(key, domainRoot, expires);
  });
}

// -----------------------------
export { setCookie, getCookie, resetCookies };
