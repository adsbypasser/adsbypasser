import { nop } from "./core.js";
import { waitDOM } from "./dom.js";
import { info } from "./logger.js";
import { usw } from "./platform.js";

const isSafari =
  Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0;

function removeAllTimer() {
  let handle = window.setInterval(nop, 10);
  while (handle > 0) {
    window.clearInterval(handle--);
  }

  handle = window.setTimeout(nop, 10);
  while (handle > 0) {
    window.clearTimeout(handle--);
  }
}

function disableLeavePrompt(element) {
  if (!element) {
    return;
  }

  const seal = {
    set: () => info("blocked onbeforeunload"),
  };

  element.onbeforeunload = undefined;

  if (isSafari) {
    element.__defineSetter__("onbeforeunload", seal.set);
  } else {
    usw.Object.defineProperty(element, "onbeforeunload", {
      configurable: true,
      enumerable: false,
      get: undefined,
      set: seal.set,
    });
  }

  const originalAddEventListener = element.addEventListener;
  element.addEventListener = function (type) {
    if (type === "beforeunload") {
      info("blocked addEventListener onbeforeunload");
      return;
    }
    return originalAddEventListener.apply(this, arguments);
  };
}

/**
 * Replace the whole document with an empty one, purging page styles, nodes,
 * event listeners and timers.
 *
 * This is a DOM operation: it waits for DOMContentLoaded, so callers must
 * await it. Errors are not caught.
 * @returns {Promise<void>}
 */
async function rebuildDocument() {
  await waitDOM();

  // Parsing an empty input yields a fresh <html><head></head><body></body>.
  const doc = usw.document;
  doc.open();
  doc.close();

  if (doc.adoptedStyleSheets?.length) {
    doc.adoptedStyleSheets.length = 0;
  }
  removeAllTimer();
  disableLeavePrompt(doc.body);
}

function generateRandomIP() {
  return [0, 0, 0, 0].map(() => Math.floor(Math.random() * 256)).join(".");
}

// This is not a typo. A naive approach though, patch is welcome.
function evil(script) {
  /* eslint-disable no-unused-vars */
  return ((
    GM,
    GM_deleteValue,
    GM_getValue,
    GM_openInTab,
    GM_registerMenuCommand,
    GM_setValue,
    GM_xmlhttpRequest,
    unsafeWindow,
    window,
  ) => {
    // eslint-disable-next-line no-eval
    return eval(script);
  })();
  /* eslint-enable no-unused-vars */
}

export {
  disableLeavePrompt,
  evil,
  generateRandomIP,
  rebuildDocument,
  removeAllTimer,
};
