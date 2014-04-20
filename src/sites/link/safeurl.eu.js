$.register({
  rule: {
    host: /^(www\.)?safeurl\.eu$/,
    path: /\/\w+/,
  },
  ready: function () {
    'use strict';

    var directUrl = $.searchScripts(/window\.open\("([^"]+)"\);/);
    if (!directUrl) {
      throw new _.NoPicAdsError('script content changed');
    }
    directUrl = directUrl[1];
    $.openLink(directUrl);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
