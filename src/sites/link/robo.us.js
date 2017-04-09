$.register({
  rule: {
    host: /^robo\.us$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');
    var url = atob($.window.fl);
    $.openLink(url);
  },
});
