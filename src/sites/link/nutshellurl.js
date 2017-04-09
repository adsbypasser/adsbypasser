$.register({
  rule: {
    host: /^nutshellurl\.com$/,
  },
  ready: function () {
    'use strict';

    var iframe = $('iframe');
    $.openLink(iframe.src);
  },
});
