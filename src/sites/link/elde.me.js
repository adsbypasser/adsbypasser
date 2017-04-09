$.register({
  rule: {
    host: /^elde\.me$/,
  },
  ready: function () {
    'use strict';

    // do not remove recaptcha
    $.removeNodes('iframe:not([name=undefined])');

    var a = $('#modal-alert');
    a.style.display = 'block';
    a.style.top = 0;
    a.style.left = 0;
  },
});
