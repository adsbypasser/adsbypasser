$.register({
  rule: {
    host: /^pic(2profit|p2)\.com$/,
  },
  ready: function () {
    'use strict';

    var i = $('form > #d1 ~ input[name=bigimg]');
    $.openImage(i.value);
  },
});
