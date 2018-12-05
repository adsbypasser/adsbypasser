import {
  isString,
} from 'util/core';


const quiet = false;


function log (method, args) {
  if (quiet) {
    return;
  }
  args = Array.prototype.slice.call(args);
  if (isString(args[0])) {
    args[0] = 'AdsBypasser: ' + args[0];
  } else {
    args.unshift('AdsBypasser:');
  }
  // eslint-disable-next-line no-console
  const f = console[method];
  if (typeof f === 'function') {
    f.apply(console, args);
  }
}


function debug () {
  log('debug', arguments);
}


function info () {
  log('info', arguments);
}


function warn () {
  log('warn', arguments);
}


export {
  debug,
  info,
  warn,
};
