(function () {
  'use strict';

  function helper (m) {
    $.openImage('/images/' + m.query[1]);
  }

  // mihalism v1
  $.register({
    rule: {
      host: [
        /^(hentai-hosting|miragepics|funextra\.hostzi|img(rex|banana))\.com$/,
        /^bilder\.nixhelp\.de$/,
        /^imagecurl\.(com|org)$/,
        /^imagevau\.eu$/,
        /^img\.deli\.sh$/,
        /^image(pong|back)\.info$/,
        /^imgdream\.net$/,
        /^photoup\.biz$/,
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
      host: /imageview\.me|244pix\.com|imgnip\.com|postimg\.net$/,
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
      host: /empireload\.com$/,
      path: /^\/sexy\/Images\/links\.php$/,
      query: /file=([^&]+)/,
    },
    start: function (m) {
      $.openImage('files/' + m.query[1]);
    },
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
