$.register({
  rule: {
    host: [
      /^adlink\.guru$/,
      /^cypt\.ga$/,
    ],
  },
  ready: function () {
    'use strict';

    var f = $('#go-link');
    var args = {};
    $.$$('input', f).each(function (v) {
      args[v.name] = v.value;
    });

    $.post(f.getAttribute('action'), args).then(function (data) {
      data = JSON.parse(data);
      if (data && data.url) {
        $.openLink(data.url);
      } else {
        _.warn('wrong data');
      }
    }).catch(function (e) {
      _.warn(e);
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
