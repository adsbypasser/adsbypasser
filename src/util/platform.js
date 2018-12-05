/* global cloneInto: false exportFunction: false GM: false */

import {
  forEach,
  nop,
} from 'util/core';


const rawUSW = getUnsafeWindow();
const usw = getUnsafeWindowProxy();
const GMAPI = getGreaseMonkeyAPI();


function getUnsafeWindow () {
  let w = null;
  try {
    w = unsafeWindow;
  } catch (e) {
    try {
      // eslint-disable-next-line no-eval
      w = (0, eval)('this').global;
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
  }
  // eslint-disable-next-line no-eval
  return w ? w : (0, eval)('this').window;
}

function getGreaseMonkeyAPI () {
  // This is not ready for Node.js yet.
  if (rawUSW.global) {
    return null;
  }
  const gm = {};
  // GreaseMonkey 4.0 uses different API.
  if (typeof GM_openInTab === 'function') {
    gm.openInTab = GM_openInTab;
  } else {
    gm.openInTab = GM.openInTab;
  }
  // GreaseMonkey v4.0 changed these functions to async.
  if (typeof GM_getValue === 'function') {
    gm.getValue = (name, default_) => {
      return Promise.resolve(GM_getValue(name, default_));
    };
  } else {
    gm.getValue = GM.getValue;
  }
  if (typeof GM_setValue === 'function') {
    gm.setValue = (name, value) => {
      return Promise.resolve(GM_setValue(name, value));
    };
  } else {
    gm.setValue = GM.setValue;
  }
  if (typeof GM_deleteValue === 'function') {
    gm.deleteValue = (name) => {
      return Promise.resolve(GM_deleteValue(name));
    };
  } else {
    gm.deleteValue = GM.deleteValue;
  }
  // NOTE The capital.
  if (typeof GM_xmlhttpRequest === 'function') {
    gm.xmlHttpRequest = GM_xmlhttpRequest;
  } else {
    gm.xmlHttpRequest = GM.xmlHttpRequest;
  }
  // GreaseMonkey v4.0 removed this function.
  if (typeof GM_registerMenuCommand === 'function') {
    gm.registerMenuCommand = GM_registerMenuCommand;
  } else {
    gm.registerMenuCommand = nop;
  }
  // Lite edition does not use this function.
  if (typeof GM_getResourceURL === 'function') {
    gm.getResourceUrl = (resourceName) => {
      return Promise.resolve(GM_getResourceURL(resourceName));
    };
  } else if (typeof GM === 'object' && GM && GM.getResourceUrl) {
    gm.getResourceUrl = GM.getResourceUrl;
  }
  return gm;
}

// magic property to get the original object
const MAGIC_KEY = '__adsbypasser_reverse_proxy__';


function getUnsafeWindowProxy () {
  // GreaseMonkey 1.15 won't pass this test
  const isFirefox = typeof InstallTrigger !== 'undefined';
  // Violentmonkey does not need the wrapper
  const isWebExtension = typeof cloneInto === 'undefined' || typeof exportFunction === 'undefined';
  if (!isFirefox || isWebExtension) {
    // other browsers does not need this
    return rawUSW;
  }

  const decorator = {
    set (target, key, value) {
      if (key === MAGIC_KEY) {
        return false;
      }
      // GreaseMonkey 2.1 has a bug
      // unsafeWindow.open will become read-only after modifying
      // so we have to explicitly assign property descriptor
      if (target === unsafeWindow && key === 'open') {
        const d = Object.getOwnPropertyDescriptor(target, key);
        // wrap the returned object back so that content script can see
        // through the object
        d.value = clone(function () {
          const rv = value();
          return cloneInto(rv, unsafeWindow);
        });
        Object.defineProperty(target, key, d);
      } else {
        target[key] = clone(value);
      }
      return true;
    },
    get (target, key) {
      if (key === MAGIC_KEY) {
        return target;
      }
      const value = target[key];
      const type = typeof value;
      if (value === null || (type !== 'function' && type !== 'object')) {
        // primitive values does not need this
        return value;
      }
      return new Proxy(value, decorator);
    },
    apply (target, self, args) {
      args = Array.prototype.slice.call(args);

      // special hack for Object.defineProperty
      if (target === unsafeWindow.Object.defineProperty) {
        args[0] = args[0][MAGIC_KEY];
      }
      // special hack for Function.apply
      if (target === unsafeWindow.Function.apply) {
        self = self[MAGIC_KEY];
        args[1] = Array.prototype.slice.call(args[1]);
      }
      // special hack for querySelector
      if (target === unsafeWindow.document.querySelector) {
        self = self[MAGIC_KEY];
      }
      // special hack for write
      if (target === unsafeWindow.document.write) {
        self = self[MAGIC_KEY];
      }

      const usargs = clone(args);

      return target.apply(self, usargs);
    },
    construct (target, args) {
      args = Array.prototype.slice.call(args);
      // insert this argument
      args.unshift(undefined);
      const usargs = clone(args);
      const bind = unsafeWindow.Function.prototype.bind;
      return new (bind.apply(target, usargs));
    },
  };
  return new Proxy(unsafeWindow, decorator);
}


// Firefox only
// cloneInto is too buggy
// TODO Date, Regexp, subclasses
function clone (safe) {
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
    return exportFunction(safe, unsafeWindow, {
      allowCrossOriginArguments: true,
    });
  }
  if (safe instanceof Array) {
    const unsafe = new unsafeWindow.Array();
    for (let i = 0; i < safe.length; ++i) {
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


export {
  rawUSW,
  usw,
  GMAPI,
};
