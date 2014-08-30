// @name           AdsBypasser<%= lite ? 'Lite' : '' %>
// @namespace      AdsBypasser
// @description    Bypass Ads
// @copyright      2012+, Wei-Cheng Pan (legnaleurc)
// @version        <%= pkg.version %>
// @license        BSD
// @updateURL      https://adsbypasser.github.io/releases/adsbypasser<%= lite ? 'lite' : '' %>.meta.js
// @downloadURL    https://adsbypasser.github.io/releases/adsbypasser<%= lite ? 'lite' : '' %>.user.js
// @grant          unsafeWindow
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_getResourceText
// @grant          GM_getResourceURL
// @grant          GM_getValue
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @run-at         document-start
// @resource       alignCenter https://raw.githubusercontent.com/adsbypasser/adsbypasser/v<%= pkg.version %>/css/align_center.css
// @resource       scaleImage https://raw.githubusercontent.com/adsbypasser/adsbypasser/v<%= pkg.version %>/css/scale_image.css
// @resource       bgImage https://raw.githubusercontent.com/adsbypasser/adsbypasser/v<%= pkg.version %>/img/imagedoc-darknoise.png
// @include        http://*
// @include        https://*
