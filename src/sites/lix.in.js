$.register({
  rule: 'http://lix.in/-*',
  ready: function () {
    'use strict';

    var i = $.$('#ibdc');
    if (i) {
      // captcha, do nothing
      return;
    }
    i = $.$('form');
    if (i) {
      i.submit();
      return;
    }
    i = $('iframe');
    $.openLink(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
