$.register({
  rule: {
    host: /^www\.img(babes|flare)\.com$/,
  },
  ready: function () {
    'use strict';

    var i = $.$('input[onclick]');
    if (i) {
      $.window.Decode();
      return;
    }

    var i = $('#this_image');
    $.openImage(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
