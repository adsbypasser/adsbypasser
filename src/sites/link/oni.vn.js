$.register({
  rule: {
    host: /^www\.oni\.vn$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var data = $.searchScripts(/data:"([^"]+)"/);
    if (!data) {
      throw new _.AdsBypasserError('pattern changed');
    }
    data = data[1];

    $.get('/click.html', data).then(function (url) {
      $.openLink(url);
    });
  },
});
