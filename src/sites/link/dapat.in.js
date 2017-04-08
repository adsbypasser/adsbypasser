$.register({
  rule: {
    host: /^(www\.)?dapat\.in$/,
  },
  ready: function () {
    'use strict';

    var f = $('iframe[name=pagetext]');
    $.openLink(f.src);
  },
});
