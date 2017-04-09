$.register({
  rule: {
    host: /^www\.multiupfile\.com$/,
    path: /^\/f\//,
  },
  ready: function () {
    'use strict';

    var f = $('#yw0');
    f.submit();
  },
});
