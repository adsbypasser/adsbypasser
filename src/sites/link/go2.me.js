$.register({
  rule: {
    host: /^u\.go2\.me$/,
  },
  ready: function () {
    'use strict';

    var iframe = $('iframe');
    $.openLink(iframe.src);
  },
});
