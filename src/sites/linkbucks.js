// ==UserScript==
// @match          http://*.allanalpass.com/*
// @match          http://*.amy.gs/*
// @match          http://*.any.gs/*
// @match          http://*.cash4files.com/*
// @match          http://*.deb.gs/*
// @match          http://*.drstickyfingers.com/*
// @match          http://*.dyo.gs/*
// @match          http://*.fapoff.com/*
// @match          http://*.filesonthe.net/*
// @match          http://*.freean.us/*
// @match          http://*.freegaysitepass.com/
// @match          http://*.galleries.bz/*
// @match          http://*.goneviral.com/*
// @match          http://*.hornywood.tv/*
// @match          http://*.linkbabes.com/*
// @include        /http://\w{8}\.linkbucks\.com//
// @match          http://*.linkgalleries.net/*
// @match          http://*.linkseer.net/*
// @match          http://*.megaline.co/*
// @match          http://*.miniurls.co/*
// @match          http://*.picbucks.com/*
// @match          http://*.picturesetc.net/*
// @match          http://*.poontown.net/*
// @match          http://*.qqc.co/*
// @match          http://*.qvvo.com/*
// @match          http://*.realfiles.net/*
// @match          http://*.rqq.co/*
// @match          http://*.seriousdeals.net/*
// @match          http://*.seriousfiles.com/*
// @match          http://*.seriousurls.com/*
// @match          http://*.sexpalace.gs/*
// @match          http://*.theseblogs.com/*
// @match          http://*.thesefiles.com/*
// @match          http://*.theseforums.com/*
// @match          http://*.thesegalleries.com/*
// @match          http://*.thosegalleries.com/*
// @match          http://*.tinybucks.net/*
// @match          http://*.tinylinks.co/*
// @match          http://*.tnabucks.com/*
// @match          http://*.tubeviral.com/*
// @match          http://*.uberpicz.com/*
// @match          http://*.ubervidz.com/*
// @match          http://*.ubucks.net/*
// @match          http://*.ugalleries.net/*
// @match          http://*.ultrafiles.net/*
// @match          http://*.urlbeat.net/*
// @match          http://*.urlpulse.net/*
// @match          http://*.whackyvidz.com/*
// @match          http://*.youfap.me/*
// @match          http://*.yyv.co/*
// @match          http://*.zff.co/*
// @match          http://*.zxxo.net/*
// ==/UserScript==

$.register({
  rule: {
    host: /^[\w]{8}\.(allanalpass|a[mn]y|cash4files|deb|drstickyfingers|dyo|fapoff|filesonthe|free(an|gaysitepass)|galleries|goneviral|hornywood|link(babes|bucks|galleries|seer)|megaline|miniurls|picbucks|picturesetc|poontown|qqc|qvvo|realfiles|rqq|serious(deals|files|urls)|sexpalace|these(blogs|files|forums)|(these|those|u)galleries|tiny(bucks|links)|tnabucks|tubeviral|uber(picz|vidz)|ubucks|ultrafiles|url(beat|pulse)|whackyvidz|youfap|yyv|zff|zxxo)\.(com?|net|gs|me|tv|bz|us)/,
  },
  run: function () {
    'use strict';

    $.removeAllTimer();
    $.resetCookies();

    if (window.location.pathname.indexOf('verify') >= 0) {
      $.openLink('/');
      return;
    }

    if (unsafeWindow && unsafeWindow.Lbjs && unsafeWindow.Lbjs.TargetUrl) {
      $.openLink(unsafeWindow.Lbjs.TargetUrl);
      return;
    }

    var matches = document.body.innerHTML.match(/TargetUrl\s*=\s*['"]([^'"]+)['"]/);
    if (matches) {
      $.openLink(matches[1]);
    }
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
