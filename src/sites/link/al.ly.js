$.register({
  rule: {
    host: /^al\.ly$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe, #CashSlideDiv, #ct_catfish');

    var a = document.querySelector('#modal-shadow');
    a.style.display = 'block';
    a = document.querySelector('#modal-alert');
    a.style.left = 0;
    a.style.top = 80;
    a.style.display = 'block';
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
