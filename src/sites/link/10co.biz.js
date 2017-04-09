$.register({
  rule: {
    host: /^10co\.(biz|xyz|co|me)$/,
  },
  ready: function () {
    'use strict';

    var d = $('.go');
    $.openLink(d.dataset.href);
  },
});
