import {
  nop,
} from 'util/core';
import {
  usw,
} from 'util/platform';
import {
  warn,
} from 'util/logger';


function removeAllTimer () {
  let handle = window.setInterval(nop, 10);
  while (handle > 0) {
    window.clearInterval(handle--);
  }
  handle = window.setTimeout(nop, 10);
  while (handle > 0) {
    window.clearTimeout(handle--);
  }
}


function nuke (url) {
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


function generateRandomIP () {
  return [0, 0, 0, 0].map(() => {
    return Math.floor(Math.random() * 256);
  }).join('.');
}


// This is not typo, I mean it. A naive approach though, patch is welcome.
function evil (script) {
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


export {
  removeAllTimer,
  nuke,
  generateRandomIP,
  evil,
};
