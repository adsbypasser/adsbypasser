(function () {
  'use strict';

  var host = /^imageshack\.us$/;

  $.register({
    rule: {
      host: host,
      path: /^\/photo\/.+\/(.+)\/([^\/]+)/,
    },
    start: function (m) {
      $.openImage(_.T('/f/{0}/{1}/')(m.path[1], m.path[2]));
    },
  });

  $.register({
    rule: {
      host: host,
      path: /^\/f\/.+\/[^\/]+/,
    },
    ready: function () {
      var i = $('#fullimg');
      $.openImage(i.src);
    },
  });

})();
