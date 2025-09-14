import { forEach, nop } from 'util/core.js';

const rawUSW = getUnsafeWindow();
const usw = getUnsafeWindowProxy();
const GMAPI = getGreaseMonkeyAPI();

function getUnsafeWindow() {
  let w = null;
  try {
    w = unsafeWindow;
  } catch (e) {
    try {
      // eslint-disable-next-line no-eval
      w = (0, eval)('this').global;
    } catch (e) {
      // eslint-disable-line no-unused-vars
    }
  }
  // eslint-disable-next-line no-eval
  return w ? w : (0, eval)('this').window;
}

function getGreaseMonkeyAPI() {
  if (rawUSW.global) {
    return null;
  }

  const gm = {};

  if (typeof GM_openInTab === 'function') {
    gm.openInTab = GM_openInTab;
  } else {
    gm.openInTab = GM.openInTab;
  }

  if (typeof GM_getValue === 'function') {
    gm.getValue = (name, default_) => Promise.resolve(GM_getValue(name, default_));
  } else {
    gm.getValue = GM.getValue;
  }

  if (typeof GM_setValue === 'function') {
    gm.setValue = (name, value) => Promise.resolve(GM_setValue(name, value));
  } else {
    gm.setValue = GM.setValue;
  }

  if (typeof GM_deleteValue === 'function') {
    gm.deleteValue = (name) => Promise.resolve(GM_deleteValue(name));
  } else {
    gm.deleteValue = GM.deleteValue;
  }

  if (typeof GM_xmlhttpRequest === 'function') {
    gm.xmlHttpRequest = GM_xmlhttpRequest;
  } else {
    gm.xmlHttpRequest = GM.xmlHttpRequest;
  }

  if (typeof GM_registerMenuCommand === 'function') {
    gm.registerMenuCommand = GM_registerMenuCommand;
  } else {
    gm.registerMenuCommand = nop;
  }

  if (typeof GM_getResourceURL === 'function') {
    gm.getResourceUrl = (resourceName) => Promise.resolve(GM_getResourceURL(resourceName));
  } else if (typeof GM === 'object' && GM && GM.getResourceUrl) {
    gm.getResourceUrl = GM.getResourceUrl;
  }

  return gm;
}

function getGMInfo() {
  if (typeof GM_info === 'object' && GM_info) {
    return GM_info;
  } else if (typeof GM === 'object' && GM && GM.info) {
    return GM.info;
  }
  return {};
}

const MAGIC_KEY = '__adsbypasser_reverse_proxy__';

function getUnsafeWindowProxy() {
  const isGreaseMonkey = getGMInfo().scriptHandler === 'Greasemonkey';
  if (!isGreaseMonkey) {
    return rawUSW;
  }

  const decorator = {
    set(target, key, value) {
      if (key === MAGIC_KEY) {
        return false;
      } else {
        target[key] = clone(value);
      }
      return true;
    },
    get(target, key) {
      if (key === MAGIC_KEY) return target;

      const value = target[key];
      const type = typeof value;
      if (value === null || (type !== 'function' && type !== 'object')) {
        return value;
      }
      return new Proxy(value, decorator);
    },
    apply(target, self, args) {
      args = Array.prototype.slice.call(args);

      if (target === unsafeWindow.Object.defineProperty) {
        args[0] = args[0][MAGIC_KEY];
      }
      if (target === unsafeWindow.Function.apply) {
        self = self[MAGIC_KEY];
        args[1] = Array.prototype.slice.call(args[1]);
      }
      if (target === unsafeWindow.document.querySelector) {
        self = self[MAGIC_KEY];
      }
      if (target === unsafeWindow.document.write) {
        self = self[MAGIC_KEY];
      }

      const usargs = clone(args);
      return target.apply(self, usargs);
    },
    construct(target, args) {
      args = Array.prototype.slice.call(args);
      args.unshift(undefined);
      const usargs = clone(args);
      const bind = unsafeWindow.Function.prototype.bind;
      return new (bind.apply(target, usargs))();
    },
  };

  return new Proxy(unsafeWindow, decorator);
}

function clone(safe) {
  if (safe === null || !(safe instanceof Object)) {
    return safe;
  }
  if (safe === unsafeWindow) {
    return safe;
  }
  if (safe instanceof String) {
    return safe.toString();
  }
  if (safe instanceof Function) {
    return exportFunction(safe, unsafeWindow, { allowCrossOriginArguments: true });
  }
  if (safe instanceof Array) {
    const unsafe = new unsafeWindow.Array();
    for (let i = 0; i < safe.length; i++) {
      unsafe.push(clone(safe[i]));
    }
    return unsafe;
  }

  const unsafe = new unsafeWindow.Object();
  forEach(safe, (v, k) => {
    unsafe[k] = clone(v);
  });
  return unsafe;
}

export { rawUSW, usw, GMAPI };
