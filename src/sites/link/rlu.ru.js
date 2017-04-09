$.register({
  rule: {
    host: /^preview\.rlu\.ru$/,
  },
  ready: function () {
    'use strict';

    var a = $('#content > .long_url > a');
    $.openLink(a.href);
  },
});
