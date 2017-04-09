$.register({
  rule: {
    host: /^(www\.)?ohleech\.com$/,
    path: /^\/dl\/$/,
  },
  ready: function () {
    'use strict';

    $.window.startdl();
  },
});
