$.register({
  rule: {
    host: /^01\.nl$/,
  },
  ready: function () {
    'use strict';

    var f = $('iframe#redirectframe');
    $.openLink(f.src);
  },
});
