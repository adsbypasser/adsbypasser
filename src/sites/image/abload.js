(function () {
  'use strict';

  function run () {
    var i = $('#image');
    $.openImage(i.src);
  }

  $.register({
    rule: {
      host: /^(www\.)?image(pearl|crest)\.com$/,
      path: /^\/verify\/(.+)$/,
    },
    start: function (m) {
      $.openLink('/view/' + m.path[1], {
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
        host: /^(www\.)?image(pearl|crest)\.com$/,
        path: /^\/view\//,
      },
    ],
    ready: run,
  });

})();
