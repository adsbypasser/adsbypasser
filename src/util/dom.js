import { AdsBypasserError, isString, forEach, find, none } from 'util/core.js';
import { debug } from 'util/logger.js';

// -----------------------------
// Errors
// -----------------------------
class DomNotFoundError extends AdsBypasserError {
  constructor(selector) {
    super(`\`${selector}\` not found`);
  }

  get name() {
    return 'DomNotFoundError';
  }
}

// -----------------------------
// Query helpers
// -----------------------------
function querySelector(selector, context = document) {
  if (!context.querySelector) context = document;
  const node = context.querySelector(selector);
  if (!node) throw new DomNotFoundError(selector);
  return node;
}

function querySelectorOrNull(selector, context = document) {
  try {
    return querySelector(selector, context);
  } catch (e) {
    return null;
  }
}

function querySelectorAll(selector, context = document) {
  if (!context.querySelectorAll) context = document;
  return context.querySelectorAll(selector);
}

// -----------------------------
// DOM parsing
// -----------------------------
function toDOM(rawHTML) {
  try {
    const parser = new DOMParser();
    return parser.parseFromString(rawHTML, 'text/html');
  } catch (e) {
    throw new AdsBypasserError('could not parse HTML to DOM');
  }
}

// -----------------------------
// DOM manipulation
// -----------------------------
function remove(selector, context) {
  const nodes = querySelectorAll(selector, context);
  forEach(nodes, (el) => {
    debug('removed', el);
    el.remove();
  });
}

function block(selector, context = document) {
  let fn;

  if (isString(selector)) {
    fn = () => remove(selector, context);
  } else if (typeof selector === 'function') {
    fn = (mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (selector(node)) node.parentNode.removeChild(node);
      });
    };
  } else {
    throw new TypeError('wrong selector');
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(fn);
  });

  observer.observe(context, {
    childList: true,
    subtree: true,
  });
}

// -----------------------------
// Search scripts
// -----------------------------
function searchFromScriptsByRegExp(pattern, context) {
  const scripts = querySelectorAll('script', context);
  const [, , match] = find(scripts, (s) => {
    const m = s.textContent.match(pattern);
    return m || none;
  });
  return match === none ? null : match;
}

function searchFromScriptsByString(pattern, context) {
  const scripts = querySelectorAll('script', context);
  const [, matchIndex] = find(scripts, (s) => {
    const idx = s.textContent.indexOf(pattern);
    return idx >= 0 ? idx : none;
  });
  return matchIndex === none ? null : scripts[matchIndex].textContent;
}

function searchFromScripts(pattern, context) {
  if (pattern instanceof RegExp) return searchFromScriptsByRegExp(pattern, context);
  if (isString(pattern)) return searchFromScriptsByString(pattern, context);
  return null;
}

// -----------------------------
export {
  block,
  querySelector,
  querySelectorAll,
  querySelectorOrNull,
  remove,
  searchFromScripts,
  toDOM,
};
