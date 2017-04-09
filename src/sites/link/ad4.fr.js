$.register({
  rule: {
    host: /^ad4\.fr$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var s = $.searchScripts(/"src", "([^"]+)"/);
    if (!s) {
      _.warn('changed');
      return;
    }
    $.openLink(s[1]);
  },
});
