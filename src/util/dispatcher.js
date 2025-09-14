import { AdsBypasserError, none, nop, partial, find, isString, map, every } from 'util/core.js';

const patterns = [];

function register(pattern) {
  patterns.push(pattern);
}

// -----------------------------
// Dispatch helpers
// -----------------------------
function dispatchByObject(rule, urlFull) {
  const matched = map(rule, (pattern, part) => {
    if (pattern instanceof RegExp) return urlFull[part].match(pattern);
    if (Array.isArray(pattern)) {
      const [, , r] = find(pattern, (sp) => {
        const m = urlFull[part].match(sp);
        return m || none;
      });
      return r !== none ? r : null;
    }
    throw new AdsBypasserError('invalid rule');
  });

  const passed = every(matched, v => !!v);
  return passed ? matched : null;
}

function dispatchByRegExp(rule, urlStr) {
  return urlStr.match(rule);
}

function dispatchByArray(rules, urlStr, urlObj, urlFull) {
  const [, , r] = find(rules, (rule) => {
    const m = dispatch(rule, urlStr, urlObj, urlFull);
    return m ? m : none;
  });
  return r !== none ? r : null;
}

function dispatchByString(rule, urlObj) {
  const schemeRe = /\*|https?|file|ftp|chrome-extension/;
  const hostRe = /\*|(\*\.)?([^/*]+)/;
  const pathRe = /\/.*/;

  const tmp = `^(${schemeRe.source})://(${hostRe.source})?(${pathRe.source})$`;
  const up = new RegExp(tmp);
  const matched = rule.match(up);
  if (!matched) return null;

  let [ , scheme, host, wildcardPart, domainSuffix, path ] = matched;

  if (scheme === '*' && !/https?/.test(urlObj.scheme)) return null;
  if (scheme !== '*' && scheme !== urlObj.scheme) return null;

  if (scheme !== 'file' && host !== '*') {
    if (wildcardPart) {
      const pos = urlObj.host.indexOf(domainSuffix);
      if (pos < 0 || pos + domainSuffix.length !== urlObj.host.length) return null;
    } else if (host !== urlObj.host) {
      return null;
    }
  }

  path = new RegExp(`^${path.replace(/[*.[\]?+#]/g, (c) => c === '*' ? '.*' : '\\' + c)}$`);
  if (!path.test(urlObj.path)) return null;

  return urlObj;
}

function dispatchByFunction(rule, urlStr, urlObj, urlFull) {
  return rule(urlStr, urlObj, urlFull);
}

function dispatch(rule, urlStr, urlObj, urlFull) {
  if (Array.isArray(rule)) return dispatchByArray(rule, urlStr, urlObj, urlFull);
  if (typeof rule === 'function') return dispatchByFunction(rule, urlStr, urlObj, urlFull);
  if (rule instanceof RegExp) return dispatchByRegExp(rule, urlStr);
  if (isString(rule)) return dispatchByString(rule, urlObj);
  return dispatchByObject(rule, urlFull);
}

// -----------------------------
// Find handler
// -----------------------------
function getCurrentUrlObjects() {
  const { protocol, host, hostname, port, pathname, search, hash } = window.location;
  return {
    urlStr: window.location.toString(),
    urlObj: {
      scheme: protocol.slice(0, -1),
      host,
      path: pathname + search + hash,
    },
    urlFull: {
      scheme: protocol,
      host: hostname,
      port,
      path: pathname,
      query: search,
      hash,
    },
  };
}

function findHandler() {
  const { urlStr, urlObj, urlFull } = getCurrentUrlObjects();

  const [i, pattern, matched] = find(patterns, (pattern) => {
    const m = dispatch(pattern.rule, urlStr, urlObj, urlFull);
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
