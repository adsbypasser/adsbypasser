$.register({
  rule: {
    host: /^stash-coins\.com$/,
  },
  start: function () {
    'use strict';

    var url = window.location.toString();
    var i = url.lastIndexOf('http');
    url = url.substr(i);
    $.openLink(url);
  },
});
