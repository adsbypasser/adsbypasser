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
