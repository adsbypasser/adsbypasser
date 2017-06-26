$.register({
  rule: {
    host: /^topload\.pro$/,
  },
  ready: function () {
    'use strict';
    var a = $('.hide a.btn');
    $.openLink(a.href);
  },
});
