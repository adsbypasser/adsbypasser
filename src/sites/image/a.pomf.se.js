$.register({
  rule: [
    {
      host: /^a\.pomf\.se$/,
      path: /^\/.+\.htm$/,
    },
    {
      host: /^empireload\.com$/,
      path: /^\/sexy\/.+\.htm$/,
    },
  ],
  ready: function () {
    'use strict';

    var a = $.$('body > a');
    if (a) {
      $.openImage(a.href);
      return;
    }
    $.removeNodes('#boxes, iframe');
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
