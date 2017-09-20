class AdsBypasserError extends Error {

  constructor (message) {
    super(message);
  }

  get name () {
    return 'AdsBypasserError';
  }

}


function forEach (collection, fn) {
  if (isArrayLike(collection)) {
    return Array.prototype.forEach.call(collection, fn);
  }
  return Object.keys(collection).forEach((k) => {
    return fn(collection[k], k, collection);
  });
}


function every (collection, fn) {
  if (isArrayLike(collection)) {
    return Array.prototype.every.call(collection, fn);
  }
  return Object.keys(collection).every((k) => {
    return fn(collection[k], k, collection);
  });
}


function map (collection, fn) {
  if (isArrayLike(collection)) {
    return Array.prototype.map.call(collection, fn);
  }
  const mapped = Object.assign({}, collection);
  Object.getOwnPropertyNames(mapped).forEach((k) => {
    mapped[k] = fn(collection[k], k, collection);
  });
  return mapped;
}


function find (collection, fn) {
  for (const [k, v] of enumerate(collection)) {
    const r = fn(v, k, collection);
    if (r !== none) {
      return [k, v, r];
    }
  }
  return [none, none, none];
}


function * enumerate (collection) {
  if (isArrayLike(collection)) {
    yield * Array.prototype.entries.call(collection);
    return;
  }
  const keys = Object.getOwnPropertyNames(collection);
  for (const k of keys) {
    yield [k, collection[k]];
  }
}


function isArrayLike (collection) {
  return Array.isArray(collection) || isNodeList(collection);
}


function isNodeList (collection) {
  return collection.constructor.name === 'NodeList';
}


function partial (fn, ...args) {
  if (typeof fn !== 'function') {
    throw new AdsBypasserError('must give a function');
  }
  // NOTE need to preserve *this* context?
  return (...innerArgs) => {
    return fn(...args.concat(innerArgs));
  };
}


function isString (value) {
  return (typeof value === 'string') || (value instanceof String);
}


function nop () {
}


const none = nop;


function wait (msDelay) {
  return new Promise((resolve) => {
    setTimeout(resolve, msDelay);
  });
}


function tryEvery (msInterval, fn) {
  return new Promise((resolve) => {
    const handle = setInterval(function () {
      const result = fn();
      if (result !== none) {
        clearInterval(handle);
        resolve(result);
      }
    }, msInterval);
  });
}


export {
  AdsBypasserError,
  every,
  find,
  forEach,
  isString,
  map,
  none,
  nop,
  partial,
  tryEvery,
  wait,
};
