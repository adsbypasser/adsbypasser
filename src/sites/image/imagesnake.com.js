(function () {
  'use strict';

  function run () {
    var i = $('#img_obj');
    $.openImage(i.src, {
      referer: true,
    });
  }

  function run2 () {
    var i = $('#img_obj');
    $.openImage(i.src, {
      replace: true,
    });
  }

  $.register({
    rule: [
      {
        host: [
          /^www\.(freebunker|imgcarry|imgshots)\.com$/,
          /^www\.imagesnake\.(com|org)$/,
        ],
        path: /^\/show\.php$/,
        query: /^\?/,
      },
      {
        host: /^www\.(freebunker|imgshots)\.com$/,
        path: /^\/show\//,
      },
      {
        host: [
          /^www\.imagesnake\.(com|org)$/,
          /^www\.imagefruit\.com$/,
        ],
        path: /^\/(img|show)\/.+/,
      },
      {
        host: /^imageban\.(ru|net)$/,
        path: /^\/show\/\d{4}\/\d{2}\/\d{2}\/.+/,
      },
      'http://fotoo.pl/show.php?img=*.html',
      {
        host: /^www\.(fotoszok\.pl|imagestime)\.com$/,
        path: /^\/show\.php\/.*\.html$/,
      },
    ],
    ready: run,
  });

  $.register({
    rule: {
      host: /^www\.imgcarry\.com$/,
      path: /^\/show\//,
    },
    ready: run2,
  });

})();
