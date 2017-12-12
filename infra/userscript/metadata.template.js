// @name           <%= title %>
// @namespace      AdsBypasser
// @description    Bypass Ads
// @copyright      2012+, Wei-Cheng Pan (legnaleurc)
// @version        <%= version %>
// @license        BSD
// @homepageURL    https://adsbypasser.github.io/
// @supportURL     https://github.com/adsbypasser/adsbypasser/issues
// @updateURL      https://adsbypasser.github.io/releases/adsbypasser.<%= buildName %>.meta.js
// @downloadURL    https://adsbypasser.github.io/releases/adsbypasser.<%= buildName %>.user.js
// @icon           https://raw.githubusercontent.com/adsbypasser/adsbypasser/v<%= version %>/resources/img/logo.png
// @grant          GM_deleteValue
<% if (supportImage) { %>
// @grant          GM_getResourceURL
<% } %>
// @grant          GM_getValue
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM.deleteValue
<% if (supportImage) { %>
// @grant          GM.getResourceUrl
<% } %>
// @grant          GM.getValue
// @grant          GM.openInTab
// @grant          GM.setValue
// @grant          GM.xmlHttpRequest
// @grant          unsafeWindow
<% if (supportImage) { %>
// @resource       alignCenter https://raw.githubusercontent.com/adsbypasser/adsbypasser/v<%= version %>/resources/css/align_center.css
// @resource       scaleImage https://raw.githubusercontent.com/adsbypasser/adsbypasser/v<%= version %>/resources/css/scale_image.css
// @resource       bgImage https://raw.githubusercontent.com/adsbypasser/adsbypasser/v<%= version %>/resources/img/imagedoc-darknoise.png
<% } %>
// @run-at         document-start
// @include        http://*
// @include        https://*
// @connect        *
