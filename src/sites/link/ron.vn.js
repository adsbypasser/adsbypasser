$.register({
  rule: {
    host: /^www\.ron\.vn$/,
  },
  ready: function () {
    'use strict';

    var script = $.searchScripts('linknexttop');
    var data = script.match(/data:"([^"]+)"/);
    var url = $.window.domain + 'click.html?' + data[1];
    $.get(url, {}, {
      'Content-Type': 'application/json; charset=utf-8',
    }).then(function (url) {
      $.openLink(url);
    });
  },
});
