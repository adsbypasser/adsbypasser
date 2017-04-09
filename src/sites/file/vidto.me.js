$.register({
  rule: {
    host: /^(www\.)?vidto\.me$/,
  },
  ready: function () {
    'use strict';

    var f = $('#btn_download').form;

    setTimeout(function() {
        f.submit();
    }, 6000);
  },
});
