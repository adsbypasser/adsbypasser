// ==UserScript==
// @match          http://*.bat5.com/*
// @match          http://*.celebclk.com/*
// @match          http://*.clb1.com/*
// @match          http://*.detonating.com/*
// @match          http://*.eightteen.com/*
// @match          http://*.looble.net/*
// @match          http://*.peekatmygirlfriend.com/*
// @match          http://*.pornyhost.com/*
// @match          http://*.smilinglinks.com/*
// @include        /http://.+\.urlcash\.(com|net|org)\/.*/
// @match          http://*.urlgalleries.com/*
// @match          http://*.xxxs.org/*
// @match          http://celebclk.com/*
// ==/UserScript==

(function () {
  'use strict';

  $.register({
    rule: {
      host: /urlcash\.(com|net|org)|(bat5|detonating|celebclk|eightteen|smilinglinks|peekatmygirlfriend|pornyhost|clb1|urlgalleries)\.com|looble\.net|xxxs\.org$/,
    },
    run: function () {
      if (unsafeWindow && unsafeWindow.linkDestUrl) {
        $.redirect(unsafeWindow.linkDestUrl);
        return;
      }

      var matches = document.body.innerHTML.match(/linkDestUrl = '(.+)'/);
      if (matches) {
        $.redirect(matches[1]);
        return;
      }
    },
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
