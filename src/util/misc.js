import { nop } from 'util/core.js';
import { usw } from 'util/platform.js';
import { warn } from 'util/logger.js';

// -----------------------------
// Timer helpers
// -----------------------------
function removeAllTimer() {
  let handle = window.setInterval(nop, 10);
  while (handle > 0) window.clearInterval(handle--);

  handle = window.setTimeout(nop, 10);
  while (handle > 0) window.clearTimeout(handle--);
}

// -----------------------------
// DOM helpers
// -----------------------------
function nuke(url) {
  try {
    usw.document.write('nuked by AdsBypasser, leading to ...<br/>');
  } catch (e) {
    warn('nuke failed', e);
  }

  const a = document.createElement('a');
  a.href = url;
  a.textContent = url;
  document.body.appendChild(a);
}

// -----------------------------
// Misc helpers
// -----------------------------
function generateRandomIP() {
  return [0, 0, 0, 0]
    .map(() => Math.floor(Math.random() * 256))
    .join('.');
}

// A naive sandboxed evaluation approach; patch if needed
function evil(script) {
  /* eslint-disable no-unused-vars */
  return ((
    GM,
    GM_deleteValue,
    GM_getResourceURL,
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

export { removeAllTimer, nuke, generateRandomIP, evil };
