$.register({
  rule: {
    host: /^ehdwallpapers\.org$/,
    path: /^\/images\/.*$/,
  },
  ready: function () {
    'use strict';
    var i = $('.entry-content.clearfix img');
    $.openImage(i.src);
  },
});
