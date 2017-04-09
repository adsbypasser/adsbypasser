$.register({
  rule: {
    host: /^cocoleech\.com$/,
  },
  ready: function () {
    'use strict';

    var a = $('#download');
    $.openLink(a.href);
  },
});
