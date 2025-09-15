import { nop } from 'util/core.js';
import { findHandler } from 'util/dispatcher.js';
import { rawUSW, GMAPI, usw } from 'util/platform.js';
import { dumpConfig, loadConfig } from 'util/config.js';
import { warn, info } from 'util/logger.js';
import '__ADSBYPASSER_HANDLERS__';

// -----------------------------
// Safari detection
// -----------------------------
const isSafari =
  Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

// -----------------------------
// Window / unload overrides
// -----------------------------
function disableWindowOpen() {
  try {
    usw.open = () => ({ closed: false });
  } catch {
    warn('cannot mock window.open');
  }
  usw.alert = nop;
  usw.confirm = nop;
}

function disableLeavePrompt(element) {
  if (!element) return;

  const seal = {
    set: () => info('blocked onbeforeunload'),
  };

  element.onbeforeunload = undefined;

  if (isSafari) {
    element.__defineSetter__('onbeforeunload', seal.set);
  } else {
    usw.Object.defineProperty(element, 'onbeforeunload', {
      configurable: true,
      enumerable: false,
      get: undefined,
      set: seal.set,
    });
  }

  const originalAddEventListener = element.addEventListener;
  element.addEventListener = function (type) {
    if (type === 'beforeunload') {
      info('blocked addEventListener onbeforeunload');
      return;
    }
    return originalAddEventListener.apply(this, arguments);
  };
}

// -----------------------------
// DOM helpers
// -----------------------------
function changeTitle() {
  document.title += ' - AdsBypasser';
}

function waitDOM() {
  return new Promise((resolve) => {
    if (document.readyState !== 'loading') {
      resolve();
      return;
    }
    document.addEventListener('DOMContentLoaded', () => resolve());
  });
}

// -----------------------------
// Lifecycle hooks
// -----------------------------
async function beforeDOMReady(handler) {
  const config = await dumpConfig();
  info(
    'working on\n%s \nwith\n%s',
    window.location.toString(),
    JSON.stringify(config),
  );

  disableLeavePrompt(usw);
  disableWindowOpen();
  await handler.start();
}

async function afterDOMReady(handler) {
  disableLeavePrompt(usw.document.body);
  changeTitle();
  await handler.ready();
}

// -----------------------------
// Main
// -----------------------------
async function main() {
  if (rawUSW.top !== rawUSW.self) return; // skip frames

  GMAPI.registerMenuCommand('AdsBypasser - Configure', () => {
    GMAPI.openInTab('https://adsbypasser.github.io/configure.html');
  });

  await loadConfig();

  const handler = findHandler();
  if (handler) {
    await beforeDOMReady(handler);
    await waitDOM();
    await afterDOMReady(handler);
  }
}

main().catch((_) => warn(_));
