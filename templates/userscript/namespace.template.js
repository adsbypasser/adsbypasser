/**
 * Namespace template for AdsBypasser userscript
 *
 * This template provides the core utility imports and namespace setup
 * for the AdsBypasser userscript. It imports various utility modules
 * and creates a unified interface for accessing them.
 */

// Core utility imports
import { get, post } from '$lib/ajax';
import { getCookie, setCookie, resetCookies } from '$lib/cookie';
import {
  AdsBypasserError,
  find,
  forEach,
  none,
  partial,
  tryEvery,
  wait,
} from '$lib/core';
import { register } from '$lib/dispatcher';
import {
  block,
  querySelector,
  querySelectorAll,
  querySelectorOrNull,
  remove,
  searchFromScripts,
  toDOM,
} from '$lib/dom';
<% if (supportImage) { %>
import { openImage } from '$lib/image';
<% } %>
import { openLink } from '$lib/link';
import { info, warn } from '$lib/logger';
import {
  evil,
  generateRandomIP,
  nuke,
  removeAllTimer,
} from '$lib/misc';
import { usw } from '$lib/platform';


// Functional utility object
const _ = {
  AdsBypasserError,
  evil,
  find,
  forEach,
  generateRandomIP,
  info,
  none,
  partial,
  register,
  tryEvery,
  wait,
  warn,
};


// DOM utility wrapper
function $(selector, context) {
  return querySelector(selector, context);
}

$.$ = querySelectorOrNull;
$.$$ = querySelectorAll;

$.block = block;
$.get = get;
$.getCookie = getCookie;
$.nuke = nuke;
<% if (supportImage) { %>
$.openImage = openImage;
<% } %>
$.openLink = openLink;
$.post = post;
$.remove = remove;
$.removeAllTimer = removeAllTimer;
$.resetCookies = resetCookies;
$.searchFromScripts = searchFromScripts;
$.setCookie = setCookie;
$.toDOM = toDOM;
$.window = usw;


// Export symbols
export {
  _,
  $,
};
