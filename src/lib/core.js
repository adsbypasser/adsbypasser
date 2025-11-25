/**
 * Core utility functions for AdsBypasser
 *
 * This module provides essential functional programming utilities
 * and core helper functions used throughout the AdsBypasser project.
 */

/**
 * Custom error class for AdsBypasser-specific errors
 */
class AdsBypasserError extends Error {
  /**
   * Create an AdsBypasserError
   * @param {string} message - Error message
   */
  constructor(message) {
    super(message);
  }

  get name() {
    return "AdsBypasserError";
  }
}

/**
 * Execute a function for each element in a collection
 * Works with both arrays and objects
 * @param {Array|Object} collection - Collection to iterate over
 * @param {Function} fn - Function to execute for each element
 */
function forEach(collection, fn) {
  if (isArrayLike(collection)) {
    return Array.prototype.forEach.call(collection, fn);
  }
  return Object.keys(collection).forEach((k) =>
    fn(collection[k], k, collection),
  );
}

/**
 * Test whether all elements in a collection pass a test function
 * @param {Array|Object} collection - Collection to test
 * @param {Function} fn - Test function
 * @returns {boolean} - True if all elements pass the test
 */
function every(collection, fn) {
  if (isArrayLike(collection)) {
    return Array.prototype.every.call(collection, fn);
  }
  return Object.keys(collection).every((k) => fn(collection[k], k, collection));
}

/**
 * Create a new collection by applying a function to each element
 * @param {Array|Object} collection - Collection to map
 * @param {Function} fn - Function to apply to each element
 * @returns {Array|Object} - New collection with transformed elements
 */
function map(collection, fn) {
  if (isArrayLike(collection)) {
    return Array.prototype.map.call(collection, fn);
  }
  const mapped = Object.assign({}, collection);
  Object.getOwnPropertyNames(mapped).forEach((k) => {
    mapped[k] = fn(collection[k], k, collection);
  });
  return mapped;
}

/**
 * Find the first element in a collection that satisfies a condition
 * @param {Array|Object} collection - Collection to search
 * @param {Function} fn - Condition function
 * @returns {Array} - Array containing [key, value, result] or [none, none, none]
 */
function find(collection, fn) {
  for (const [k, v] of enumerate(collection)) {
    const r = fn(v, k, collection);
    if (r !== none) {
      return [k, v, r];
    }
  }
  return [none, none, none];
}

/**
 * Enumerate elements in a collection with their keys
 * @param {Array|Object} collection - Collection to enumerate
 * @yields {Array} - Array containing [key, value] pairs
 */
function* enumerate(collection) {
  if (isArrayLike(collection)) {
    yield* Array.prototype.entries.call(collection);
    return;
  }
  const keys = Object.getOwnPropertyNames(collection);
  for (const k of keys) {
    yield [k, collection[k]];
  }
}

/**
 * Check if a collection is array-like
 * @param {any} collection - Collection to check
 * @returns {boolean} - True if collection is array-like
 */
function isArrayLike(collection) {
  return Array.isArray(collection) || isNodeList(collection);
}

/**
 * Check if a collection is a NodeList
 * @param {any} collection - Collection to check
 * @returns {boolean} - True if collection is a NodeList
 */
function isNodeList(collection) {
  return collection.constructor.name === "NodeList";
}

/**
 * Create a partial function application
 * @param {Function} fn - Function to partially apply
 * @param {...any} args - Arguments to pre-fill
 * @returns {Function} - Partially applied function
 */
function partial(fn, ...args) {
  if (typeof fn !== "function") {
    throw new AdsBypasserError("must give a function");
  }
  return (...innerArgs) => fn(...args.concat(innerArgs));
}

/**
 * Check if a value is a string
 * @param {any} value - Value to check
 * @returns {boolean} - True if value is a string
 */
function isString(value) {
  return typeof value === "string" || value instanceof String;
}

/**
 * No-operation function
 */
function nop() {}

/**
 * Sentinel value used to represent "no value"
 */
const none = nop;

/**
 * Create a promise that resolves after a delay
 * @param {number} msDelay - Delay in milliseconds
 * @returns {Promise} - Promise that resolves after delay
 */
function wait(msDelay) {
  return new Promise((resolve) => setTimeout(resolve, msDelay));
}

/**
 * Repeatedly try a function until it returns a non-none value
 * @param {number} msInterval - Interval between tries in milliseconds
 * @param {Function} fn - Function to try
 * @returns {Promise} - Promise that resolves with the function result
 */
function tryEvery(msInterval, fn) {
  return new Promise((resolve) => {
    const handle = setInterval(() => {
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
