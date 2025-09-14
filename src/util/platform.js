import { forEach, nop } from 'util/core.js';

// -----------------------------
// Expose unsafeWindow and proxies
// -----------------------------
const rawUSW = getUnsafeWindow();
const usw = getUnsafeWindowProxy();
const GMAPI = getGreaseMonkeyAPI();

// -----------------------------
// Unsafe window helpers
// -----------------------------
function getUnsafeWindow() {
  let w = null;
  try {
    w = unsafeWindow;
  } catch (e) {
    // fallback for other contexts
    try {
      w = (0, eval)('this').global;
    } catch (e) {
      // ignore
    }
  }
  return w ? w : (0, eval)('this').window;
}

// -----------------------------
// GreaseMonkey API shim
// -----------------------------
function getGreaseMonkeyAPI() {
  if (rawUSW.global) return null;

  const gm = {};

  // GreaseMonkey 4.x uses different API
  gm.openInTab = typeof GM_openInTab === 'function' ? GM_openInTab : GM.openInTab;

  gm.getValue =
    typeof GM_getValue === 'function'
      ? (name, default_) => Promise.resolve(GM_getValue(name, default_))
      : GM.getValue;

  gm.setValue =
    typeof GM_setValue === 'function'
      ? (name, value) => Promise.resolve(GM_setValue(name, value))
      : GM.setValue;

  gm.deleteValue =
    typeof GM_deleteValue === 'function'
      ? (name) => Promise.resolve(GM_deleteValue(name))
      : GM.deleteValue;

  gm.xmlHttpRequest = typeof GM_xmlhttpRequest === 'function' ? GM_xmlhttpRequest : GM.xmlHttpRequest;
  gm.registerMenuCommand = typeof GM_registerMenuCommand === 'function' ? GM_registerMenuCommand : nop;

  if (typeof GM_getResourceURL === 'function') {
    gm.getResourceUrl = (resourceName) => Promise.resolve(GM_getResourceURL(resourceName));
  } else if (typeof GM === 'object' && GM && GM.getResourceUrl) {
    gm.getResourceUrl = GM.getResourceUrl;
  }

  return gm;
}

// -----------------------------
// GreaseMonkey info helper
// -----------------------------
function getGMInfo() {
  if (typeof GM_info === 'object' && GM_info) return GM_info;
  if (typeof GM === 'object' && GM && GM.info) return GM.info;
  return {};
}

// -----------------------------
// Proxy unsafeWindow for GreaseMonkey
// -----------------------------
const MAGIC_KEY = '__adsbypasser_reverse_proxy__';

function getUnsafeWindowProxy() {
  const isGreaseMonkey = getGMInfo().scriptHandler === 'Greasemonkey';
  if (!isGreaseMonkey) return rawUSW;

  const decorator = {
    set(target, key, value) {
      if (key === MAGIC_KEY) return false;
      target[key] = clone(value);
      return true;
    },
    get(target, key) {
      if (key === MAGIC_KEY) return target;

      const value = target[key];
      const type = typeof value;

      if (value === null || (type !== 'function' && type !== 'object')) return value;

      return new Proxy(value, decorator);
    },
    apply(target, self, args) {
      args = Array.prototype.slice.call(args);

      if (target === unsafeWindow.Object.defineProperty) args[0] = args[0][MAGIC_KEY];
      if (target === unsafeWindow.Function.apply) {
        self = self[MAGIC_KEY];
        args[1] = Array.prototype.slice.call(args[1]);
      }
      if (target === unsafeWindow.document.querySelector) self = self[MAGIC_KEY];
      if (target === unsafeWindow.document.write) self = self[MAGIC_KEY];

      return target.apply(self, clone(args));
    },
    construct(target, args) {
      args = Array.prototype.slice.call(args);
      args.unshift(undefined);
      return new (unsafeWindow.Function.prototype.bind.apply(target, clone(args)))();
    },
  };

  return new Proxy(unsafeWindow, decorator);
}

// -----------------------------
// Clone helper
// -----------------------------
function clone(safe) {
  if (safe === null || !(safe instanceof Object)) return safe;
  if (safe === unsafeWindow) return safe;
  if (safe instanceof String) return safe.toString();
  if (safe instanceof Function) {
    return exportFunction(safe, unsafeWindow, { allowCrossOriginArguments: true });
  }
  if (safe instanceof Array) {
    const unsafe = new unsafeWindow.Array();
    for (let i = 0; i < safe.length; ++i) unsafe.push(clone(safe[i]));
    return unsafe;
  }

  const unsafe = new unsafeWindow.Object();
  forEach(safe, (v, k) => {
    unsafe[k] = clone(v);
  });
  return unsafe;
}

export { rawUSW, usw, GMAPI };
