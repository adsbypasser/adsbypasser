$.register({
  rule: 'http://www.dumppix.com/viewer.php?*',
  ready: function () {
    'use strict';

    var i = $.$('#boring');
    if (i) {
      $.openLink(i.src);
      return;
    }
    i = $('table td:nth-child(1) a');
    $.openLink(i.href);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
