$.register({
  rule: {
    host: /^urlms\.com$/,
  },
  ready: function () {
    'use strict';

    var iframe = $('#content');
    $.openLink(iframe.src);
  },
});
