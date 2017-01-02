$.register({
  rule: {
    host: [
      /^gsurl\.me$/,
      /^g5u\.pw$/,
    ],
  },
  ready: function () {
    'use strict';

    $.removeNodes('#container');

    var a = $('#link');
    _.wait(5000).then(function () {
      $.openLink(a.href);
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
