(function () {
  'use strict';

  function helper (m) {
    $.openImage('/images/' + m.query[1]);
  }

  // mihalism v1
  $.register({
    rule: {
      host: [
        /^(hentai-hosting|miragepics|funextra\.hostzi|imgrex|cdn\.javtotal|img3x)\.com$/,
        /^bilder\.nixhelp\.de$/,
        /^imagecurl\.(com|org)$/,
        /^imagevau\.eu$/,
        /^img\.deli\.sh$/,
        /^img(dream|soo|nm|silo)\.net$/,
        /^imgsicily\.it$/,
        /^www\.imghere\.net$/,
      ],
      path: /^\/viewer\.php$/,
      query: /file=([^&]+)/,
    },
    start: helper,
  });

  // dwimg.com
  $.register({
    rule: {
      host: /^(dwimg|imgsin|www\.pictureshoster)\.com$/,
      path: /^\/viewer\.php$/,
      query: /file=([^&]+)/,
    },
    start: function (m) {
      $.openImage('/files/' + m.query[1]);
    },
  });

  // imageview.me
  $.register({
    rule: {
      host: [
        /img(nip|central|cream)\.com$/,
        /imageview\.me|244pix\.com|postimg\.net$/,
      ],
      path: /^\/viewerr.*\.php$/,
      query: /file=([^&]+)/,
    },
    start: helper,
  });

  // overpic.net
  $.register({
    rule: [
      'http://www.overpic.net/viewer.php?file=*',
    ],
    ready: function () {
      var i = $('#main_img');
      $.openImage(i.src);
    },
  });

  // empireload.com
  $.register({
    rule: {
      host: /(empireload|loadsanook)\.com$/,
      query: /file=([^&]+)/,
    },
    start: function (m) {
      $.openImage('files/' + m.query[1]);
    },
  });

  // empireload.com
  $.register({
    rule: {
      host: /^dumppix\.com$/,
      path: /^\/viewer\.php$/,
      query: /file=([^&]+)/,
    },
    start: function (m) {
      $.openImage('/images/' + m.query[1], {
        referer: true,
      });
    },
  });

  $.register({
    rule: {
      host: /^xxxhost\.me$/,
      path: /^\/viewer\d+\.php$/,
      query: /file=([^&]+)/,
    },
    start: function (m) {
      $.openImage('files/' + m.query[1]);
    },
  });

})();
