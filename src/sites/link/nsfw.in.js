$.register({
  rule: {
    host: /^nsfw\.in$/,
  },
  ready: function () {
    'use strict';

    var a = $('#long_url a');
    $.openLink(a.href);
  },
});
