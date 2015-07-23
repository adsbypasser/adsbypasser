(function () {
  'use strict';

  function ready () {
    $.removeNodes('iframe');

    var node = $.$('#continuetoimage > form input');
    if (node) {
      // first pass
      node.click();
      // somehow imgrun.net need to click twice
      node.click();
      return;
    }

    // second pass
    var i = $('img[class^=centred]');
    $.openImage(i.src);
  }

  $.register({
    rule: [
      {
        host: [
          // com
          // starts with image
          /^image(ontime|corn|picsa)\.com$/,
          // ends with image
          /^(zonezeed|zelje|croft|myhot|bok|hostur)image\.com$/,
          // starts with img
          /^img(rill|next|savvy|\.spicyzilla|twyti|xyz|devil|tzar|ban|pu)\.com$/,
          // starts with img-
          /^img-(zone|planet)\.com$/,
          // starts with www
          /^www\.(imagefolks|img(blow|lemon))\.com$/,
          // else
          /^(picstwist|ericsony|wpc8|uplimg|xxx\.pornprimehd|lexiit|thumbnailus)\.com$/,
          /^((i|hentai)\.)?imgslip\.com$/,
          /^(i|xxx)\.hentaiyoutube\.com$/,
          /^(go|er)imge\.com$/,
          /^(like\.)08lkk\.com$/,
          /^(www\.)?\.imgult\.com$/,
          /^nudeximg\.com$/,
          /imgseeds\.com$/,
          /damimage\.com$/,
          /imagedecode\.com$/,
          // net
          /^img(serve|coin|fap|candy|master|-view|run)\.net$/,
          /^(gallerycloud|imagelaser|project-photo)\.net$/,
          // org
          /^img(studio|spot)\.org$/,
          /^image(\.adlock|on|team)\.org$/,
          /^(dragimage|teenshot)\.org$/,
          // else
          /^(hotimages|55888)\.eu$/,
          /^imgcloud\.co$/,
          /^pixup\.us$/,
          /^bulkimg\.info$/,
          /^img\.yt$/,
          /^vava\.in$/,
          /^pixxx\.me$/,
        ],
        path: /^\/img-.*\.html$/,
      },
      {
        host: [
          /^img(run|twyti)\.net$/,
          /^imgtwyti\.com$/,
        ],
        path: /^\/t\/img-.*\.html$/,
      },
      {
        host: /^imgking\.co$/,
        path: /^\/img-.*\.htmls$/,
      },
    ],
    ready: ready,
  });

  $.register({
    rule: {
      host: /^www.img(adult|taxi).com$/,
      path: /^\/img-.*\.html$/,
    },
    start: function () {
      var c = $.getCookie('user');
      if (c) {
        return;
      }
      $.setCookie('user', 'true');
      window.location.reload();
    },
    ready: ready,
  });

  function helper () {
    // crack the shitty qqc.co visitScript 5440
    $.window.setTimeout = _.nop;

    // this site checks cookie that caculate from session
    // do an AJAX to skip checking
    return $.get(window.location.toString()).then(function (data) {
      return $.toDOM(data);
    });
  }

  $.register({
    rule: {
      host: /^08lkk\.com$/,
      path: /^\/Photo\/img-.+\.html$/,
    },
    start: function () {
      helper().then(function (page) {
        var i = $('img[class^=centred]', page);
        $.openImage(i.src);
      });
    },
  });

  $.register({
    rule: {
      host: /^08lkk\.com$/,
      path: /^\/\d+\/img-.*\.html$/,
    },
    start: function () {
      helper().then(function (page) {
        var bbcode = $.$('#imagecodes input', page);
        bbcode = bbcode.value.match(/.+\[IMG\]([^\[]+)\[\/IMG\].+/);
        bbcode = bbcode[1];
        bbcode = bbcode.replace('small', 'big');

        $.openImage(bbcode);
      });
    },
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
