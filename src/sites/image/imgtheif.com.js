$.register({
  rule: 'http://imgtheif.com/image/*.html',
  ready: function () {
    'use strict';

    var a = $('div.content-container a');
    $.openImage(a.href);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
