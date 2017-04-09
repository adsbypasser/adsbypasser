$.register({
  rule: {
    host: /^gkurl\.us$/,
  },
  ready: function () {
    'use strict';

    var iframe = $('#gkurl-frame');
    $.openLink(iframe.src);
  },
});
