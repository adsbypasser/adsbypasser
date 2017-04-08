$.register({
  rule: {
    host: /^(www\.)?arab\.sh$/,
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';

    var f = $('form[name=F1]');
    setTimeout(function() {
        f.submit();
    }, 20000);
  },
});
