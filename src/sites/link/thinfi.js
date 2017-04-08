$.register({
  rule: {
    host: /^thinfi\.com$/,
  },
  ready: function () {
    'use strict';
    var a = $('div p a');
    $.openLink(a.href);
  },
});
