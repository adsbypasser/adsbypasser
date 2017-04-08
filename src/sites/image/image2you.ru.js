$.register({
  rule: {
    host: /^image2you\.ru$/,
    path: /^\/\d+\/\d+/,
  },
  ready: function () {
    'use strict';

    var i = $.$('div.t_tips2 div > img');
    if (!i) {
      $.openLink('', {
        post: {
          _confirm: '',
        },
      });
      return;
    }
    $.openImage(i.src);
  },
});
