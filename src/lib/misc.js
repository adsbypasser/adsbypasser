import { nop } from "./core.js";
import { usw } from "./platform.js";
import { warn } from "./logger.js";

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

function nuke(url) {
  // document.write() mid-execution implicitly calls document.open(), which
  // clears the current document *and removes document.body*. The subsequent
  // document.body.appendChild(a) then throws on the null body, silently
  // dropping the URL link. Do the full replace atomically instead: open the
  // document once, write both the message and the link, then close.
  const doc = usw.document;
  const safeUrl = String(url).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
  try {
    doc.open();
    doc.write(
      `nuked by AdsBypasser, leading to <a href="${safeUrl}">${safeUrl}</a>`,
    );
    doc.close();
  } catch (e) {
    warn("nuke failed", e);
  }
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

export { removeAllTimer, nuke, generateRandomIP, evil };
