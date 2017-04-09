$.register({
  rule: {
    host: [
      /^al\.ly$/,
      /^ally\.sh$/,
    ],
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe, #CashSlideDiv, #ct_catfish');

    var a = $('#modal-shadow');
    a.style.display = 'block';
    a = $('#modal-alert');
    a.style.left = 0;
    a.style.top = 80;
    a.style.display = 'block';
  },
});
