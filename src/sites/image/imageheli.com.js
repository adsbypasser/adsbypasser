$.register({
  rule: {
    host: /^imageheli\.com|imgtube\.net|pixliv\.com$/,
    path: /^\/img-([a-zA-Z0-9\-]+)\..+$/,
  },
  ready: function () {
    'use strict';

    var a = $.$('a[rel="lightbox"]');
    if (!a) {
      $.openLink('', {
        post: {
          browser_fingerprint: '',
          ads: '0',
        },
      });
      return;
    }
    $.openImage(a.href);
  },
});
