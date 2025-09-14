import { isString } from 'util/core.js';

const quiet = false;

// -----------------------------
// Internal logging helper
// -----------------------------
function log(method, args) {
  if (quiet) return;

  const argsArray = Array.prototype.slice.call(args);
  if (isString(argsArray[0])) {
    argsArray[0] = 'AdsBypasser: ' + argsArray[0];
  } else {
    argsArray.unshift('AdsBypasser:');
  }

  const consoleMethod = console[method];
  if (typeof consoleMethod === 'function') {
    consoleMethod.apply(console, argsArray);
  }
}

// -----------------------------
// Public logging functions
// -----------------------------
function debug() {
  log('debug', arguments);
}

function info() {
  log('info', arguments);
}

function warn() {
  log('warn', arguments);
}

export { debug, info, warn };
