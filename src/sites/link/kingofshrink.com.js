$.register({
  rule: {
    host: /^(www\.)?kingofshrink\.com$/,
  },
  ready: function () {
    'use strict';

    var l = $('#textresult > a');

    $.openLink(l.href);
  },
});
