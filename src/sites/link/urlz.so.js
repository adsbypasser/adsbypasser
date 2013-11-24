$.register({
  rule: 'http://urlz.so/l/*',
  ready: function () {
    'use strict';

    var i = $.$('td > a');
    if (i) {
      i = i.href;
      var m = i.match(/javascript:declocation\('(.+)'\);/);
      if (m) {
        i = atob(m[1]);
      }
      $.openLink(i);
      return;
    }
    i = $('img');
    $.captcha(i.src, function (a) {
      var b = $('input[name=captcha]');
      var c = $('input[name=submit]');
      b.value = a;
      c.click();
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
