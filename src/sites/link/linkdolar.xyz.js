$.register({
  rule: {
    host: /^linkdolar\.xyz$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var s = $.searchScripts(/^\s*eval\((.+)\)\s*$/);
    if (!s) {
      _.warn('site changed');
      return;
    }
    s = eval('(' + s[1] + ')');
    s = s.match(/\$\.post\('([^']+)',(\{.+\}),function/);
    if (!s) {
      _.warn('site changed');
    }

    var url = s[1];
    var args = eval('(' + s[2] + ')');

    $.post(url, args).then(function (target) {
      $.openLink(target);
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
