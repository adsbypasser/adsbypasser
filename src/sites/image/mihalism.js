(function () {
  'use strict';

  function helper (m) {
    $.openImage('/images/' + m.query[1]);
  }

  // mihalism v1
  $.register({
    rule: {
      host: [
        /^(hentai-hosting|miragepics|funextra\.hostzi|imgrex)\.com$/,
        /^bilder\.nixhelp\.de$/,
        /^imagecurl\.(com|org)$/,
        /^imagevau\.eu$/,
        /^img\.deli\.sh$/,
        /^imgking\.us$/,
        /^image(pong|back)\.info$/,
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

  // catpic.biz
  $.register({
    rule: {
      host: /^catpic\.biz$/,
      path: /^(\/\w)?\/viewer\.php$/,
      query: /file=([^&]+)/,
    },
    start: function (m) {
      var url = _.T('{0}/images/{1}');
      $.openImage(url(m.path[1] || '', m.query[1]));
    },
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

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
