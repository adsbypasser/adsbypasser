import {
  nop,
} from 'util/core';


const rawUSW = getUnsafeWindow();
const usw = rawUSW;
const GMAPI = getGreaseMonkeyAPI();


function getUnsafeWindow () {
  let w = null;
  try {
    w = unsafeWindow;
  } catch (e) {
    try {
      // eslint-disable-next-line no-eval
      w = (0, eval)('this').global;
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
  }
  // eslint-disable-next-line no-eval
  return w ? w : (0, eval)('this').window;
}

function getGreaseMonkeyAPI () {
  // This is not ready for Node.js yet.
  if (rawUSW.global) {
    return null;
  }
  const gm = {};
  // GreaseMonkey 4.0 uses different API.
  if (typeof GM_openInTab === 'function') {
    gm.openInTab = GM_openInTab;
  } else {
    gm.openInTab = GM.openInTab;
  }
  // GreaseMonkey v4.0 changed these functions to async.
  if (typeof GM_getValue === 'function') {
    gm.getValue = (name, default_) => {
      return Promise.resolve(GM_getValue(name, default_));
    };
  } else {
    gm.getValue = GM.getValue;
  }
  if (typeof GM_setValue === 'function') {
    gm.setValue = (name, value) => {
      return Promise.resolve(GM_setValue(name, value));
    };
  } else {
    gm.setValue = GM.setValue;
  }
  if (typeof GM_deleteValue === 'function') {
    gm.deleteValue = (name) => {
      return Promise.resolve(GM_deleteValue(name));
    };
  } else {
    gm.deleteValue = GM.deleteValue;
  }
  // NOTE The capital.
  if (typeof GM_xmlhttpRequest === 'function') {
    gm.xmlHttpRequest = GM_xmlhttpRequest;
  } else {
    gm.xmlHttpRequest = GM.xmlHttpRequest;
  }
  if (typeof GM_registerMenuCommand === 'function') {
    gm.registerMenuCommand = GM_registerMenuCommand;
  } else {
    gm.registerMenuCommand = nop;
  }
  // Lite edition does not use this function.
  if (typeof GM_getResourceURL === 'function') {
    gm.getResourceUrl = (resourceName) => {
      return Promise.resolve(GM_getResourceURL(resourceName));
    };
  } else if (typeof GM === 'object' && GM && GM.getResourceUrl) {
    gm.getResourceUrl = GM.getResourceUrl;
  }
  return gm;
}


export {
  rawUSW,
  usw,
  GMAPI,
};
