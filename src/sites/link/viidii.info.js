$.register({
  rule: {
    host: /^www\.viidii\.info$/,
  },
  ready: function () {
    'use strict';

    var o = $('#directlink');
    $.openLink(o.href);
  },
});
