// ==UserScript==
// @match          http://*.imagecarry.com/*
// @match          http://*.imagedunk.com/*
// @match          http://*.imageporter.com/*
// @match          http://*.imageswitch.com/*
// @match          http://*.piclambo.net/*
// @match          http://*.picleet.com/*
// @match          http://*.picturedip.com/*
// @match          http://*.pictureturn.com/*
// @match          http://*.pixroute.com/*
// @match          http://*.yankoimages.net/*
// @match          http://imagecarry.com/*
// @match          http://imagedunk.com/*
// @match          http://imageporter.com/*
// @match          http://imageswitch.com/*
// @match          http://piclambo.net/*
// @match          http://picleet.com/*
// @match          http://picturedip.com/*
// @match          http://pictureturn.com/*
// @match          http://pixroute.com/*
// @match          http://yankoimages.net/*
// ==/UserScript==

(function () {
  'use strict';

  $register({
    rule: {
      host: /(imagecarry|imagedunk|imageporter|imageswitch|picleet|picturedip|pictureturn|pixroute)\.com|(piclambo|yankoimages)\.net/,
    },
    run: function () {
      var o = $('center img[id]');
      $redirect(o.src);
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
