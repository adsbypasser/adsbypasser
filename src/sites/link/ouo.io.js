$.register({
  rule: {
    host: /^(www\.)?ouo\.(io|press)$/,
    path: /^\/go\/\w+$/,
  },
  ready: function (m) {
    'use strict';

    $('form').submit();
  },
});
