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
// @match          http://*.linkbucks.com/*
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
// @exclude        http://www.linkbucks.com/
// ==/UserScript==

(function () {
  'use strict';

  $register({
    rule: {
      host: /^[\w]{8}\..*\.(com?|net|gs|me|tv|bz|us)/,
    },
    run: function () {
      $removeAllTimer();

      if (unsafeWindow.document.body.onbeforeunload) {
        unsafeWindow.document.body.onbeforeunload = null;
      }

      if (window.location.pathname.indexOf('verify') >= 0) {
        $redirect('/');
        return;
      }

      if (unsafeWindow && unsafeWindow.Lbjs && unsafeWindow.Lbjs.TargetUrl) {
        $redirect(unsafeWindow.Lbjs.TargetUrl);
        return;
      }

      var matches = document.body.innerHTML.match(/TargetUrl\s*=\s*['"]([^'"]+)['"]/);
      if (matches) {
        $redirect(matches[1]);
      }
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
