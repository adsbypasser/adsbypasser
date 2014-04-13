$.register({
  rule: {
    host: /^(www\.)?safeurl\.eu$/,
    path: /\/\w+/
  },
  ready: function () {
    'use strict';

    var rUrl = /window\.open\("([^"]+)"\);/;

    var directUrl = $.$$('script').find(function (script) {
     var m = rUrl.exec(script.innerHTML);
      if (!m) {
       return _.nop;
      }
      return m[1];
    });

    if (!directUrl) {
      throw new _.NoPicAdsError('script content changed');
    }

    $.openLink(directUrl.payload);
  }
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;