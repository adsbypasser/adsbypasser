$.register({
  rule: 'http://img1.imagilive.com/*/*',
  ready: function () {
    'use strict';

    var a = $.$('#page a.button');
    if (a) {
      $.redirect(a.href);
      return;
    }

    var i = $('#page > img:not([id])');
    $.openImage(i.src);
  },
});
