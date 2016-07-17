$.register({
  rule: {
    host: /^elde\.me$/,
  },
  ready: function () {
    'use strict';

    // do not remove recaptcha
    $.removeNodes('iframe:not([name=undefined])');

    var a = $('#modal-alert');
    a.style.display = 'block';
    a.style.top = 0;
    a.style.left = 0;
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
