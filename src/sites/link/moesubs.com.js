$.register({
  rule: {
    host: /^moesubs\.com$/,
    path: /^\/url\//,
  },
  ready: function () {
    'use strict';

    var a = $('body > div:nth-child(4) > i:nth-child(1)');
    a = a.textContent;
    var i = a.lastIndexOf('http');
    a = a.substr(i);
    $.openLink(a);
  },
});
