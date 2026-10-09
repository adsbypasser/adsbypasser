import { nop } from "./lib/core.js";
import { findHandler } from "./lib/dispatcher.js";
import { waitDOM } from "./lib/dom.js";
import { disableLeavePrompt } from "./lib/misc.js";
import { rawUSW, GMAPI, usw } from "./lib/platform.js";
import { dumpConfig, loadConfig } from "./lib/config.js";
import { warn, info } from "./lib/logger.js";
import "__ADSBYPASSER_HANDLERS__";

// -----------------------------
// Window overrides
// -----------------------------
function disableWindowOpen() {
  try {
    usw.open = () => ({ closed: false });
  } catch {
    warn("cannot mock window.open");
  }
  usw.alert = nop;
  usw.confirm = nop;
}

// -----------------------------
// DOM helpers
// -----------------------------
function changeTitle() {
  document.title += " - AdsBypasser";
}

// -----------------------------
// Lifecycle hooks
// -----------------------------
async function beforeDOMReady(handler) {
  const config = await dumpConfig();
  info(
    "working on\n%s \nwith\n%s",
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
  if (rawUSW.top !== rawUSW.self) {
    // skip frames
    return;
  }
  GMAPI.registerMenuCommand("AdsBypasser - Configure", () => {
    GMAPI.openInTab("https://adsbypasser.github.io/configure.html");
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
