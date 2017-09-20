import {
  AdsBypasserError,
  none,
  nop,
  partial,
  find,
  isString,
  map,
  every,
} from 'util/core';


const patterns = [];


function register (pattern) {
  patterns.push(pattern);
}


// TODO support String for each part?
function dispatchByObject (rule, url_6) {
  const matched = map(rule, (pattern, part) => {
    if (pattern instanceof RegExp) {
      return url_6[part].match(pattern);
    }
    if (Array.isArray(pattern)) {
      // may be an array of regexp
      const [, , r] = find(pattern, (sp) => {
        const m = url_6[part].match(sp);
        return m || none;
      });
      return r !== none ? r : null;
    }
    throw new AdsBypasserError('invalid rule');
  });

  const passed = every(matched, (v) => {
    return !!v;
  });

  return passed ? matched : null;
}


function dispatchByRegExp (rule, url_1) {
  return url_1.match(rule);
}


function dispatchByArray (rules, url_1, url_3, url_6) {
  const [, , r] = find(rules, (rule) => {
    const m = dispatch(rule, url_1, url_3, url_6);
    return m ? m : none;
  });
  return r !== none ? r : null;
}


function dispatchByString (rule, url_3) {
  // <scheme> := '*' | 'http' | 'https' | 'file' | 'ftp' | 'chrome-extension'
  let scheme = /\*|https?|file|ftp|chrome-extension/;
  // <host> := '*' | '*.' <any char except '/' and '*'>+
  let host = /\*|(\*\.)?([^/*]+)/;
  // <path> := '/' <any chars>
  let path = /\/.*/;
  // <url-pattern> := <scheme>://<host><path>
  let tmp = `^(${scheme.source})://(${host.source})?(${path.source})$`;
  let up = new RegExp(tmp);
  const matched = rule.match(up);

  if (!matched) {
    return null;
  }

  scheme = matched[1];
  host = matched[2];
  const wc = matched[3];
  const sd = matched[4];
  path = matched[5];

  if (scheme === '*' && !/https?/.test(url_3.scheme)) {
    return null;
  }
  if (scheme !== url_3.scheme) {
    return null;
  }

  if (scheme !== 'file' && host !== '*') {
    if (wc) {
      up = url_3.host.indexOf(sd);
      if (up < 0 || up + sd.length !== url_3.host.length) {
        return null;
      }
    } else if (host !== url_3.host) {
      return null;
    }
  }

  tmp = path.replace(/[*.[\]?+#]/g, (c) => {
    if (c === '*') {
      return '.*';
    }
    return '\\' + c;
  });
  path = new RegExp(`^${tmp}$`);
  if (!path.test(url_3.path)) {
    return null;
  }

  return url_3;
}


function dispatchByFunction (rule, url_1, url_3, url_6) {
  return rule(url_1, url_3, url_6);
}


function dispatch (rule, url_1, url_3, url_6) {
  // recursively dispatching
  if (Array.isArray(rule)) {
    return dispatchByArray(rule, url_1, url_3, url_6);
  }

  // dispatch by HTML content
  if (typeof rule === 'function') {
    return dispatchByFunction(rule, url_1, url_3, url_6);
  }

  // dispatch by URL
  if (rule instanceof RegExp) {
    return dispatchByRegExp(rule, url_1);
  }
  if (isString(rule)) {
    return dispatchByString(rule, url_3);
  }
  return dispatchByObject(rule, url_6);
}


function findHandler () {
  const url_1 = window.location.toString();
  // <scheme>://<host><path>
  const url_3 = {
    scheme: window.location.protocol.slice(0, -1),
    host: window.location.host,
    path: window.location.pathname + window.location.search + window.location.hash,
  };
  // <scheme>//<host>:<port><path><query><hash>
  const url_6 = {
    scheme: window.location.protocol,
    host: window.location.hostname,
    port: window.location.port,
    path: window.location.pathname,
    query: window.location.search,
    hash: window.location.hash,
  };

  const [i, pattern, matched] = find(patterns, (pattern) => {
    const m = dispatch(pattern.rule, url_1, url_3, url_6);
    return m ? m : none;
  });
  if (i === none) {
    return null;
  }
  // TODO log found pattern

  // no handler implies this site should be excluded
  if (!pattern.start && !pattern.ready) {
    return null;
  }

  return {
    start: pattern.start ? partial(pattern.start, matched) : nop,
    ready: pattern.ready ? partial(pattern.ready, matched) : nop,
  };
}


export {
  register,
  findHandler,
};
