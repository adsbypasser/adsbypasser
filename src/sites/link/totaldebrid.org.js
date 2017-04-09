$.register({
  rule: {
    host: /^(www\.)?totaldebrid\.org$/,
    path:/\/l\/(l\.php)?$/,
    query: /\?ads=([a-zA-Z0-9=]+)$/,
  },
  start: function (m) {
    'use strict';

    var l = atob(m.query[1]);
    $.openLink(l);
  },
});
