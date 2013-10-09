// @name           NoPicAds
// @namespace      FoolproofProject
// @description    No Picture Advertisements
// @copyright      2012+, legnaleurc (https://github.com/legnaleurc/nopicads)
// @version        <%= pkg.version %>
// @license        BSD
// @updateURL      https://userscripts.org/scripts/source/154858.meta.js
// @downloadURL    https://userscripts.org/scripts/source/154858.user.js
// @grant          unsafeWindow
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_getResourceText
// @grant          GM_getResourceURL
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @run-at         document-start
// @resource       imageStyle https://raw.github.com/legnaleurc/nopicads/v<%= pkg.version %>/css/image.css
// @resource       bgImage https://raw.github.com/legnaleurc/nopicads/v<%= pkg.version %>/img/imagedoc-darknoise.png
// @include        /^https?://.+$/
