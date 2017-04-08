$.register({
  rule: {
    host: /^xlink.me$/
  },
  ready: function () {
    'use strict';
    var a = $('#main_form > center > a');
    if (!a) {return;}

    $.openLink(a.href);
  },
});
