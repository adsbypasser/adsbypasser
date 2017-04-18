$.register({
  rule: {
    host: /^idlelive\.com$/,
    path: /^\/.{3,}/,
  },
  ready: function () {
    'use strict';
    var i = $('a[title^=Click]');
    $.openLink(i.href);
  },
});
