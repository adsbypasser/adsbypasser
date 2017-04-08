$.register({
  rule: {
    host: /^www\.img(babes|flare)\.com$/,
  },
  ready: function () {
    'use strict';

    var i = $.$('input[onclick]');
    if (i) {
      $.window.Decode();
      return;
    }

    var i = $('#this_image');
    $.openImage(i.src);
  },
});
