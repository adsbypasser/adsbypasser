// -----------------------------
// Custom Error
// -----------------------------
class AdsBypasserError extends Error {
  constructor(message) {
    super(message);
  }

  get name() {
    return 'AdsBypasserError';
  }
}

// -----------------------------
// Sentinel & no-op
// -----------------------------
const nop = () => {};
const none = nop;

// -----------------------------
// Type checks
// -----------------------------
const isArrayLike = collection => Array.isArray(collection) || isNodeList(collection);
const isNodeList = collection => collection?.constructor?.name === 'NodeList';
const isString = value => typeof value === 'string' || value instanceof String;

// -----------------------------
// Collection utilities
// -----------------------------
const Collection = {
  enumerate(collection) {
    if (isArrayLike(collection)) {
      return Array.prototype.entries.call(collection);
    }
    return Object.getOwnPropertyNames(collection).map(k => [k, collection[k]]);
  },

  forEach(collection, fn) {
    for (const [k, v] of this.enumerate(collection)) {
      fn(v, k, collection);
    }
  },

  every(collection, fn) {
    for (const [k, v] of this.enumerate(collection)) {
      if (!fn(v, k, collection)) return false;
    }
    return true;
  },

  map(collection, fn) {
    if (isArrayLike(collection)) {
      return Array.prototype.map.call(collection, fn);
    }
    const result = { ...collection };
    Object.getOwnPropertyNames(result).forEach(k => {
      result[k] = fn(collection[k], k, collection);
    });
    return result;
  },

  find(collection, fn) {
    for (const [k, v] of this.enumerate(collection)) {
      const r = fn(v, k, collection);
      if (r !== none) return [k, v, r];
    }
    return [none, none, none];
  },
};

// -----------------------------
// Partial application
// -----------------------------
const partial = (fn, ...args) => {
  if (typeof fn !== 'function') {
    throw new AdsBypasserError('must give a function');
  }
  return (...innerArgs) => fn(...args, ...innerArgs);
};

// -----------------------------
// Async helpers
// -----------------------------
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const tryEvery = (msInterval, fn) => new Promise(resolve => {
  const handle = setInterval(() => {
    const result = fn();
    if (result !== none) {
      clearInterval(handle);
      resolve(result);
    }
  }, msInterval);
});

// -----------------------------
export {
  AdsBypasserError,
  Collection,
  isArrayLike,
  isNodeList,
  isString,
  partial,
  nop,
  none,
  wait,
  tryEvery,
};
