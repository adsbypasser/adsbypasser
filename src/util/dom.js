import { AdsBypasserError, isString, forEach, find, none } from "util/core.js";
import { debug } from "util/logger.js";

class DomNotFoundError extends AdsBypasserError {
  constructor(selector) {
    super(`\`${selector}\` not found`);
  }

  get name() {
    return "DomNotFoundError";
  }
}

function querySelector(selector, context) {
  if (!context || !context.querySelector) context = document;
  const node = context.querySelector(selector);
  if (!node) throw new DomNotFoundError(selector);
  return node;
}

function querySelectorOrNull(selector, context) {
  try {
    return querySelector(selector, context);
  } catch (e) {
    // eslint-disable-line no-unused-vars
    return null;
  }
}

function querySelectorAll(selector, context) {
  if (!context || !context.querySelectorAll) context = document;
  return context.querySelectorAll(selector);
}

function toDOM(rawHTML) {
  try {
    const parser = new DOMParser();
    return parser.parseFromString(rawHTML, "text/html");
  } catch (e) {
    // eslint-disable-line no-unused-vars
    throw new AdsBypasserError("could not parse HTML to DOM");
  }
}

function remove(selector, context) {
  const nodes = querySelectorAll(selector, context);
  forEach(nodes, (el) => {
    debug("removed", el);
    el.remove();
  });
}

function block(selector, context = document) {
  let fn;
  if (isString(selector)) {
    fn = () => remove(selector, context);
  } else if (typeof selector === "function") {
    fn = (mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (selector(node)) node.parentNode.removeChild(node);
      });
    };
  } else {
    throw new TypeError("wrong selector");
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => fn(mutation));
  });

  observer.observe(context, {
    childList: true,
    subtree: true,
  });
}

function searchFromScriptsByRegExp(pattern, context) {
  const scripts = querySelectorAll("script", context);
  const [, , m] = find(scripts, (s) => {
    const match = s.textContent.match(pattern);
    return match || none;
  });
  return m === none ? null : m;
}

function searchFromScriptsByString(pattern, context) {
  const scripts = querySelectorAll("script", context);
  const [, m] = find(scripts, (s) => {
    const idx = s.textContent.indexOf(pattern);
    return idx < 0 ? none : idx;
  });
  return m === none ? null : m.textContent;
}

function searchFromScripts(pattern, context) {
  if (pattern instanceof RegExp)
    return searchFromScriptsByRegExp(pattern, context);
  if (isString(pattern)) return searchFromScriptsByString(pattern, context);
  return null;
}

export {
  block,
  querySelector,
  querySelectorAll,
  querySelectorOrNull,
  remove,
  searchFromScripts,
  toDOM,
};
