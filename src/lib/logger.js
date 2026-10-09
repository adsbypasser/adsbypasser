import { isString } from "./core.js";

const quiet = false;

function log(method, args) {
  if (quiet) {
    return;
  }

  args = Array.prototype.slice.call(args);
  if (isString(args[0])) {
    args[0] = "AdsBypasser: " + args[0];
  } else {
    args.unshift("AdsBypasser:");
  }

  const fn = console[method];
  if (typeof fn === "function") {
    fn.apply(console, args);
  }
}

export function debug() {
  log("debug", arguments);
}

export function info() {
  log("info", arguments);
}

export function warn() {
  log("warn", arguments);
}
