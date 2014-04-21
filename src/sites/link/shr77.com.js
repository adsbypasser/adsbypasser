$.register({
  rule: {
  	host: /^shr(44|55|77)\.com|cpv\.(bz|li)|cpv\.acb\.im$/
  },
  ready: function () {
    'use strict';

    // Interstitial and iframed pages
    var l = document.head.innerHTML.match(/\$\('a#loading'\)\.attr\('href',"([^"]+)"\);/);

    if (typeof l[1] != 'undefined') {
      $.openLink(l[1]);
    }
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;