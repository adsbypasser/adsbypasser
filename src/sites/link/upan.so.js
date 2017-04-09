$.register({
  rule: {
    host: /^(www\.)?(upan|gxp)\.so$/,
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';

    var a = $('table.td_line a[onclick="down_process_s();"]');
    $.openLink(a.href);
  },
});
