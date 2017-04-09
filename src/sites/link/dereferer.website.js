$.register({
  rule: {
    host: /^(www\.)?dereferer\.website$/,
    query: /^\?(.+)/,
  },
  start: function (m) {
    'use strict';

    $.openLink(m.query[1]);
  },
});
