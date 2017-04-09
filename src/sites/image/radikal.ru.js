$.register({
  rule: {
    host: /^radikal\.ru$/,
    path: /^\/big\//,
  },
  ready: function () {
    'use strict';

    var i = $.$('.base-page_center > div:nth-child(2) > img:nth-child(1)');
    $.openImage(i.src);
  },
});
