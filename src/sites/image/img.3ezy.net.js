$.register({
  rule: 'http://img.3ezy.net/*.htm',
  ready: function () {
    'use strict';

    var l = $('link[rel="image_src"]');
    $.openImage(l.href);
  },
});
