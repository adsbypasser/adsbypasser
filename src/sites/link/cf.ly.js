$.register({
  rule: {
    host: /^cf\.ly$/,
    path: /^\/[^\/]+$/,
  },
  start: function (m) {
    'use strict';

    $.removeNodes('iframe');
    $.openLink('/skip' + m.path[0]);
  },
});
