import {
  AdsBypasserError,
  isString,
  forEach,
  find,
  none,
} from 'util/core';


class DomNotFoundError extends AdsBypasserError {

  constructor (selector) {
    super(`\`${selector}\` not found`);
  }

  get name () {
    return 'DomNotFoundError';
  }

}


function querySelector (selector, context) {
  if (!context || !context.querySelector) {
    context = document;
  }
  const n = context.querySelector(selector);
  if (!n) {
    throw new DomNotFoundError(selector);
  }
  return n;
}


function querySelectorOrNull (selector, context) {
  try {
    return querySelector(selector, context);
  } catch (e) {
    return null;
  }
}


function querySelectorAll (selector, context) {
  if (!context || !context.querySelectorAll) {
    context = document;
  }
  const ns = context.querySelectorAll(selector);
  return ns;
}


function toDOM (rawHTML) {
  try {
    const parser = new DOMParser();
    const DOMHTML = parser.parseFromString(rawHTML, 'text/html');
    return DOMHTML;
  } catch (e) {
    throw new AdsBypasserError('could not parse HTML to DOM');
  }
}


function remove (selector, context) {
  const nodes = querySelectorAll(selector, context);
  forEach(nodes, (e) => {
    e.parentNode.removeChild(e);
  });
}


function block (selector, context=null) {
  if (!context) {
    context = document;
  }
  let fn = null;
  if (isString(selector)) {
    fn = () => {
      remove(selector, context);
    };
  } else if (typeof selector === 'function') {
    fn = (mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (selector(node)) {
          node.parentNode.removeChild(node);
        }
      });
    };
  } else {
    throw new TypeError('wrong selector');
  }

  const o = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      fn(mutation);
    });
  });

  o.observe(context, {
    childList: true,
    subtree: true,
  });
}


function searchFromScriptsByRegExp (pattern, context) {
  const scripts = querySelectorAll('script', context);
  const [, , m] = find(scripts, (s) => {
    const m = s.textContent.match(pattern);
    if (!m) {
      return none;
    }
    return m;
  });
  if (m === none) {
    return null;
  }
  return m;
}


function searchFromScriptsByString (pattern, context) {
  const scripts = querySelectorAll('script', context);
  const [, m,] = find(scripts, (s) => {
    const m = s.textContent.indexOf(pattern);
    if (m < 0) {
      return none;
    }
    return m;
  });
  if (m === none) {
    return null;
  }
  return m.textContent;
}


function searchFromScripts (pattern, context) {
  if (pattern instanceof RegExp) {
    return searchFromScriptsByRegExp(pattern, context);
  } else if (isString(pattern)) {
    return searchFromScriptsByString(pattern, context);
  } else {
    return null;
  }
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
