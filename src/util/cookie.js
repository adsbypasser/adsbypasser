/**
 * Cookie utility functions for AdsBypasser
 *
 * This module provides functions for managing browser cookies,
 * including setting, getting, and resetting cookies.
 */

// -----------------------------
// Cookie Utility
// -----------------------------
import { none, forEach, find } from "util/core.js";

/**
 * Set a cookie value
 * @param {string} key - Cookie key
 * @param {string} value - Cookie value
 */
function setCookie(key, value) {
  document.cookie = `${key}=${value};path=${location.pathname};`;
}

/**
 * Get a cookie value by key
 * @param {string} key - Cookie key
 * @returns {string|null} - Cookie value or null if not found
 */
function getCookie(key) {
  const [, c] = find(document.cookie.split(";"), (v) => {
    const k = v.replace(/^\s*([a-zA-Z0-9-_]+)=.+$/, "$1");
    if (k !== key) return none;
  });
  if (c === none) return null;

  const match = c.replace(/^\s*[a-zA-Z0-9-_]+=([^;]+).?$/, "$1");
  return match || null;
}

/**
 * Reset all cookies for the current domain
 * Clears cookies for various domain variations
 */
function resetCookies() {
  const domainFull = document.domain;
  const domainNoWWW = domainFull.replace(/^www\./, "");
  const domainRoot = domainFull.replace(/^(\w+\.)+?(\w+\.\w+)$/, "$2");
  const expired = new Date(1e3).toUTCString();

  forEach(document.cookie.split(";"), (v) => {
    const k = v.replace(/^\s*(\w+)=.+$/, "$1");

    document.cookie = `${k}=;expires=${expired};`;
    document.cookie = `${k}=;path=/;expires=${expired};`;

    const cookieString = (key, dom, exp) =>
      `${key}=;path=/;domain=${dom};expires=${exp};`;
    document.cookie = cookieString(k, domainFull, expired);
    document.cookie = cookieString(k, domainNoWWW, expired);
    document.cookie = cookieString(k, domainRoot, expired);
  });
}

export { setCookie, getCookie, resetCookies };
