(function () {
  'use strict';

  var hostRule = /^goimagehost\.com$/;

  $.register({
    rule: {
      host: hostRule,
      path: /^\/xxx\/images\//,
    },
  });

  $.register({
    rule: {
      host: hostRule,
      path: /^\/xxx\/(.+)/,
    },
    start: function (m) {
      $.openImage('/xxx/images/' + m.path[1]);
    },
  });

  $.register({
    rule: {
      host: hostRule,
      query: /^\?v=(.+)/,
    },
    start: function (m) {
      $.openImage('/xxx/images/' + m.query[1]);
    },
  });

})();
