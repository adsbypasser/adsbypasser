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
// @icon           https://raw.githubusercontent.com/adsbypasser/adsbypasser/v<%= version %>/img/logo.png
<% if (supportImage) { %>
// @grant          GM_addStyle
// @grant          GM_getResourceText
// @grant          GM_getResourceURL
<% } %>
// @grant          GM_deleteValue
// @grant          GM_getValue
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          unsafeWindow
// @grant          GM.deleteValue
// @grant          GM.getValue
// @grant          GM.openInTab
// @grant          GM.setValue
// @grant          GM.xmlHttpRequest
// @run-at         document-start
<% if (supportImage) { %>
// @resource       alignCenter https://raw.githubusercontent.com/adsbypasser/adsbypasser/v<%= version %>/css/align_center.css
// @resource       scaleImage https://raw.githubusercontent.com/adsbypasser/adsbypasser/v<%= version %>/css/scale_image.css
// @resource       bgImage https://raw.githubusercontent.com/adsbypasser/adsbypasser/v<%= version %>/img/imagedoc-darknoise.png
<% } %>
// @include        http://*
// @include        https://*
// @connect        *
