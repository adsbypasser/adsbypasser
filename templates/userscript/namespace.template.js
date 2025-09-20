import {
  get,
  post,
} from 'util/ajax';
import {
  getCookie,
  setCookie,
  resetCookies,
} from 'util/cookie';
import {
  AdsBypasserError,
  find,
  forEach,
  none,
  partial,
  tryEvery,
  wait,
} from 'util/core';
import {
  register,
} from 'util/dispatcher';
import {
  block,
  querySelector,
  querySelectorAll,
  querySelectorOrNull,
  remove,
  searchFromScripts,
  toDOM,
} from 'util/dom';
<% if (supportImage) { %>
import {
  openImage,
} from 'util/image';
<% } %>
import {
  openLink,
} from 'util/link';
import {
  info,
  warn,
} from 'util/logger';
import {
  evil,
  generateRandomIP,
  nuke,
  removeAllTimer,
} from 'util/misc';
import {
  usw,
} from 'util/platform';


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


function $ (selector, context) {
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


export {
  _,
  $,
};
