import {
  AdsBypasserError,
  none,
  nop,
  partial,
  find,
  isString,
  map,
  every,
} from "util/core.js";

const patterns = [];

function register(pattern) {
  patterns.push(pattern);
}

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

function dispatchByRegExp(rule, url) {
  return url.match(rule);
}

function dispatchByArray(rules, url1, url3, url6) {
  const [, , r] = find(rules, (rule) => {
    const m = dispatch(rule, url1, url3, url6);
    return m ? m : none;
  });
  return r !== none ? r : null;
}

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

function dispatchByFunction(rule, url1, url3, url6) {
  return rule(url1, url3, url6);
}

function dispatch(rule, url1, url3, url6) {
  if (Array.isArray(rule)) return dispatchByArray(rule, url1, url3, url6);
  if (typeof rule === "function")
    return dispatchByFunction(rule, url1, url3, url6);
  if (rule instanceof RegExp) return dispatchByRegExp(rule, url1);
  if (isString(rule)) return dispatchByString(rule, url3);
  return dispatchByObject(rule, url6);
}

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
