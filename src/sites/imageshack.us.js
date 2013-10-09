(function () {
  'use strict';

  var host = /^imageshack\.us$/;

  $.register({
    rule: {
      host: host,
      path: /^\/photo\/.+\/(.+)\/([^\/]+)/,
    },
    run: function (m) {
      $.redirect(_.T('/f/{0}/{1}/')(m.path[1], m.path[2]));
    },
  });

  $.register({
    rule: {
      host: host,
      path: /^\/f\/.+\/[^\/]+/,
    },
    run: function () {
      var i = $('#fullimg');
      $.redirect(i.src);
    },
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
