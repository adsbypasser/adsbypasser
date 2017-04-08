$.register({
  rule: {
    host: /^aka\.gr$/
  },
  ready: function () {
    'use strict';

    var l = $('iframe#yourls-frame');
    $.openLink(l.src);
  },
});
