$.register({
  rule: {
  	host: /^shr(44|55|77)\.com|cpv\.(bz|li)|cpv\.acb\.im$/
  },
  ready: function () {
    'use strict';

    // Interstitial and iframed pages
    var l = $.searchScripts(/\$\('a#loading'\)\.attr\('href',"([^"]+)"\);/);
    if (!l) {
      throw new _.NoPicAdsError('site changed');
    }

     $.openLink(l[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;