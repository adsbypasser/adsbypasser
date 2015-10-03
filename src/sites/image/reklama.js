(function () {
  'use strict';

  function ready () {
    $.removeNodes('iframe');

    var node = $.$('#continuetoimage > form input');
    if (node) {
      // first pass
      setTimeout(function () {
        node.click();
      }, 1000);
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
          /^(zonezeed|zelje|croft|myhot|bok|hostur|greasy)image\.com$/,
          // starts with img
          /^img(next|savvy|\.spicyzilla|twyti|xyz|devil|tzar|ban|pu|beer|wet|tornado|kicks|-pay)\.com$/,
          // starts with img-
          /^img-(zone|planet)\.com$/,
          // starts with www
          /^www\.(imagefolks|img(blow|lemon))\.com$/,
          // else
          /^(picstwist|ericsony|wpc8|uplimg|xxx\.pornprimehd|lexiit|thumbnailus|nimplus|newimagepost|xxximagenow)\.com$/,
          /^((i|hentai)\.)?imgslip\.com$/,
          /^(i|xxx)\.hentaiyoutube\.com$/,
          /^(go|er)imge\.com$/,
          /^(like\.)?08lkk\.com$/,
          /^(www\.)?\.imgult\.com$/,
          /^nudeximg\.com$/,
          /imgseeds\.com$/,
          /damimage\.com$/,
          /imagedecode\.com$/,
          // net
          /^img(serve|coin|fap|candy|master|-view|run|boom)\.net$/,
          /^(gallerycloud|imagelaser|project-photo|pix-link|funimg|golfpit)\.net$/,
          // org
          /^shotimg\.org$/,
          /^img(studio|spot)\.org$/,
          /^image(\.adlock|on|team)\.org$/,
          /^(drag|teen|mega)image\.org$/,
          /^teenshot\.org$/,
          // else
          /^(hotimages|55888)\.eu$/,
          /^imgcloud\.co$/,
          /^pixup\.us$/,
          /^bulkimg\.info$/,
          /^img\.yt$/,
          /^vava\.in$/,
          /^(pixxx|picspornfree|imgload)\.me$/,
          /^(porno-pirat|24avarii)\.ru$/,
          /^hotimage\.uk$/,
          /^imgease\.re$/,
          /^goimg\.xyz$/,
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
        path: /^\/img-.*\.htmls?$/,
      },
      {
        host: /^imgbb\.net$/,
        path: /^\/.-.+$/,
      },
    ],
    ready: ready,
  });

  // TODO need to refactor the cookie rule
  $.register({
    rule: {
      host: [
        /^www\.img(taxi|adult)\.com$/,
        /^www\.imgdrive\.net$/,
      ],
      path: /^\/img-.*\.html$/,
    },
    start: function () {
      var c = $.getCookie('img_c_d') || $.getCookie('img_p_d');
      if (c) {
        return;
      }
      $.post(window.location.href.toString(), {
        cti: 1,
        ref: '',
        rc: 1,
      }).then(function (data) {
        window.location.reload();
      });
    },
    ready: function () {
      $.removeNodes('iframe');

      var node = $.$('#continuetoimage > form input');
      if (node) {
        // first pass
        node.click();
        // somehow imgrun.net need to click twice
        node.click();
        return;
      }

      // the cookies are shared in the whole domain
      // we have to reset cookies to prevent wrong state
      $.resetCookies();

      // second pass
      var i = $('img[class^=centred]');
      $.openImage(i.src);
    },
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
