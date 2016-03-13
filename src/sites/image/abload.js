(function () {
  'use strict';

  function run () {
    var i = $('#image');
    $.openImage(i.src);
  }

  $.register({
    rule: {
      host: /^(www\.)?imagepearl\.com$/,
      path: /^\/verify\/(.+)$/,
    },
    start: function (m) {
      $.openLink('/image/' + m.path[1], {
        referer: false,
      });
    },
  });

  $.register({
    rule: [
      'http://*.abload.de/image.php?img=*',
      'http://www.imageup.ru/*/*/*.html',
      // different layout same handler
      'http://itmages.ru/image/view/*/*',
      // different layout same handler
      {
        host: /^(www\.)?imagepearl\.com$/,
        path: /^\/(view|image)\//,
      },
    ],
    ready: run,
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
