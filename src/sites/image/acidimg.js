$.register({
  rule: {
    host: /^acidimg\.cc$/,
  },
  ready: function () {
    'use strict';
    try {
      var o = $('.centred');
      $.openImage(o.src);
    } catch (e) {
      $.openLink('', {
        post: {
          imgContinue: '',
        },
      });
    }
  },
});
