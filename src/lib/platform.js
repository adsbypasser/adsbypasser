import { forEach } from "./core.js";

const rawUSW = getUnsafeWindow();
const usw = getUnsafeWindowProxy();
const GMAPI = getGreaseMonkeyAPI();
const FALLBACK_VERSION = "8.0.0";
const VERSION = getGMInfo().script?.version ?? FALLBACK_VERSION;

function getUnsafeWindow() {
  let w = null;
  try {
    w = unsafeWindow;
  } catch {
    try {
      // eslint-disable-next-line no-eval
      w = (0, eval)("this").global;
    } catch {
      // fallback failed
    }
  }
  // eslint-disable-next-line no-eval
  return w ? w : (0, eval)("this").window;
}

function getGreaseMonkeyAPI() {
  if (rawUSW.global) {
    return null;
  }

  return {
    openInTab: GM?.openInTab ?? GM_openInTab,
    getValue: GM?.getValue ?? promisify(GM_getValue),
    setValue: GM?.setValue ?? promisify(GM_setValue),
    deleteValue: GM?.deleteValue ?? promisify(GM_deleteValue),
    xmlHttpRequest: GM?.xmlHttpRequest ?? GM_xmlhttpRequest,
    registerMenuCommand: GM?.registerMenuCommand ?? GM_registerMenuCommand,
  };
}

function promisify(fn) {
  return (...args) => Promise.resolve(fn(...args));
}

function getGMInfo() {
  return GM?.info ?? GM_info ?? {};
}

/// Test if structured clone is needed for unsafeWindow access.
function needStructuredClone() {
  const isFirefox = typeof mozInnerScreenX === "number";
  if (!isFirefox) {
    // Only Firefox has Xray vision restrictions.
    return false;
  }
  const { scriptHandler } = getGMInfo();
  // These handlers do not need structured clone even on Firefox.
  const excludedHandlers = new Set(["Tampermonkey", "Violentmonkey"]);
  return !excludedHandlers.has(scriptHandler);
}

const MAGIC_KEY = "__adsbypasser_reverse_proxy__";

/**
 * Get a proxy for the unsafe window.
 * @returns {Window} The unsafe window proxy.
 *
 * In Firefox, direct access to unsafeWindow is restricted and requires
 * structured clone. This proxy wraps unsafeWindow to handle structured clone
 * transparently.
 * See https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Sharing_objects_with_page_scripts
 * for details.
 * If you are not sure what this code does, **DO NOT** try to modify it.
 */
function getUnsafeWindowProxy() {
  if (!needStructuredClone()) {
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
      if (key === MAGIC_KEY) {
        return target;
      }
      const value = target[key];
      const type = typeof value;
      if (value === null || (type !== "function" && type !== "object")) {
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
    return exportFunction(safe, unsafeWindow, {
      allowCrossOriginArguments: true,
    });
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

export { rawUSW, usw, GMAPI, VERSION };
