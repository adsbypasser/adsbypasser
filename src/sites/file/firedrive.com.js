$.register({
  rule: {
    host: /^(www\.)?(firedrive|putlocker)\.com$/,
    path: /^\/file\/[0-9A-F]+$/,
  },
  ready: function () {
    'use strict';
    var c = $('#confirm_form');
    c.submit();
  },
});
