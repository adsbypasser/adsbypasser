$.register({
  rule: {
    host: /^ad2links\.com$/,
    path: /^\/\w-.+$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    $.openLinkByPost(window.location.toString(), {
      post: {
        image: 'Skip Ad.',
      },
    });
  },
});
