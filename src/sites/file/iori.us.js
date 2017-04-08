$.register({
  rule: {
    host: /^iori\.us$/,
  },
  ready: function () {
    'use strict';

    var a = $('#wrapper .tombol a');
    $.openLink(a.href);
  },
});
