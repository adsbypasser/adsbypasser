$.register({
  rule: {
    host: /^img24\.org$/,
  },
  ready: function () {
    'use strict';

    var f = $.$('img.img-polaroid + form');
    if (f) {
      f.submit();
      return;
    }

    f = $('img.img-polaroid');
    $.openImage(f.src, {
      referer: true,
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
