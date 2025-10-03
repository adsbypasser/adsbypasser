/**
 * URL pattern dispatcher for AdsBypasser
 *
 * This module handles URL pattern matching and dispatches to appropriate
 * handlers based on the current page URL. It supports various pattern
 * formats including regex, objects, arrays, and strings.
 */

import {
  AdsBypasserError,
  none,
  nop,
  partial,
  find,
  isString,
  map,
  every,
} from "./core.js";

/**
 * Array of registered patterns and their handlers
 */
const patterns = [];

/**
 * Register a pattern with its handlers
 * @param {Object} pattern - Pattern object containing rule and handlers
 */
function register(pattern) {
  patterns.push(pattern);
}

/**
 * Dispatch by object pattern matching
 * @param {Object} rule - Rule object with pattern properties
 * @param {Object} urlObj - URL object to match against
 * @returns {Object|null} - Matched object or null
 */
function dispatchByObject(rule, urlObj) {
  const matched = map(rule, (pattern, part) => {
    if (pattern instanceof RegExp) return urlObj[part].match(pattern);
    if (Array.isArray(pattern)) {
      const [, , r] = find(pattern, (sp) => {
        const m = urlObj[part].match(sp);
        return m || none;
      });
      return r !== none ? r : null;
    }
    throw new AdsBypasserError("invalid rule");
  });

  const passed = every(matched, (v) => !!v);
  return passed ? matched : null;
}

/**
 * Dispatch by RegExp pattern matching
 * @param {RegExp} rule - RegExp pattern to match
 * @param {string} url - URL string to match against
 * @returns {Array|null} - Match result or null
 */
function dispatchByRegExp(rule, url) {
  return url.match(rule);
}

/**
 * Dispatch by array of patterns
 * @param {Array} rules - Array of rules to try
 * @param {string} url1 - Full URL string
 * @param {Object} url3 - Parsed URL object (scheme, host, path)
 * @param {Object} url6 - Detailed URL object (scheme, host, port, path, query, hash)
 * @returns {Array|null} - Match result or null
 */
function dispatchByArray(rules, url1, url3, url6) {
  const [, , r] = find(rules, (rule) => {
    const m = dispatch(rule, url1, url3, url6);
    return m ? m : none;
  });
  return r !== none ? r : null;
}

/**
 * Dispatch by string pattern matching
 * @param {string} rule - String pattern to match
 * @param {Object} urlObj - Parsed URL object
 * @returns {Object|null} - Matched URL object or null
 */
function dispatchByString(rule, urlObj) {
  const schemeRegex = /\*|https?|file|ftp|chrome-extension/;
  const hostRegex = /\*|(\*\.)?([^/*]+)/;
  const pathRegex = /\/.*/;

  const tmp = `^(${schemeRegex.source})://(${hostRegex.source})?(${pathRegex.source})$`;
  const up = new RegExp(tmp);
  const matched = rule.match(up);
  if (!matched) return null;

  const [, scheme, host, wc, sd, path] = matched;

  if (
    (scheme === "*" && !/https?/.test(urlObj.scheme)) ||
    scheme !== urlObj.scheme
  )
    return null;

  if (scheme !== "file" && host !== "*") {
    if (wc) {
      const idx = urlObj.host.indexOf(sd);
      if (idx < 0 || idx + sd.length !== urlObj.host.length) return null;
    } else if (host !== urlObj.host) return null;
  }

  const pathRegexFinal = new RegExp(
    `^${path.replace(/[*.[\]?+#]/g, (c) => (c === "*" ? ".*" : "\\" + c))}$`,
  );
  if (!pathRegexFinal.test(urlObj.path)) return null;

  return urlObj;
}

/**
 * Dispatch by function pattern matching
 * @param {Function} rule - Function that takes URL parameters and returns match
 * @param {string} url1 - Full URL string
 * @param {Object} url3 - Parsed URL object (scheme, host, path)
 * @param {Object} url6 - Detailed URL object (scheme, host, port, path, query, hash)
 * @returns {any} - Function result
 */
function dispatchByFunction(rule, url1, url3, url6) {
  return rule(url1, url3, url6);
}

/**
 * Main dispatch function that routes to appropriate dispatcher
 * @param {any} rule - Rule to dispatch
 * @param {string} url1 - Full URL string
 * @param {Object} url3 - Parsed URL object (scheme, host, path)
 * @param {Object} url6 - Detailed URL object (scheme, host, port, path, query, hash)
 * @returns {any} - Dispatch result
 */
function dispatch(rule, url1, url3, url6) {
  if (Array.isArray(rule)) return dispatchByArray(rule, url1, url3, url6);
  if (typeof rule === "function")
    return dispatchByFunction(rule, url1, url3, url6);
  if (rule instanceof RegExp) return dispatchByRegExp(rule, url1);
  if (isString(rule)) return dispatchByString(rule, url3);
  return dispatchByObject(rule, url6);
}

/**
 * Find the appropriate handler for the current URL
 * @returns {Object|null} - Handler object with start and ready functions or null
 */
function findHandler() {
  const url1 = window.location.toString();
  const url3 = {
    scheme: window.location.protocol.slice(0, -1),
    host: window.location.host,
    path:
      window.location.pathname + window.location.search + window.location.hash,
  };
  const url6 = {
    scheme: window.location.protocol,
    host: window.location.hostname,
    port: window.location.port,
    path: window.location.pathname,
    query: window.location.search,
    hash: window.location.hash,
  };

  const [i, pattern, matched] = find(patterns, (pattern) => {
    const m = dispatch(pattern.rule, url1, url3, url6);
    return m ? m : none;
  });
  if (i === none) return null;
  if (!pattern.start && !pattern.ready) return null;

  return {
    start: pattern.start ? partial(pattern.start, matched) : nop,
    ready: pattern.ready ? partial(pattern.ready, matched) : nop,
  };
}

export { register, findHandler };
