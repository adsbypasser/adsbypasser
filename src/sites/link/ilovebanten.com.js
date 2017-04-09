$.register({
  rule: {
    host: /^ilovebanten\.com$/,
  },
  ready: function () {
    'use strict';

    var p = $('.notblocked');
    $.openLink(p.textContent);
  },
});
