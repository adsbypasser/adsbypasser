$.register({
  rule: {
    host: [
      /^gsurl\.(me|in)$/,
      /^g5u\.pw$/,
    ],
  },
  ready: function () {
    'use strict';

    $.removeNodes('#container');

    var a = $('#link');
    _.wait(5000).then(function () {
      $.openLink(a.href);
    });
  },
});
