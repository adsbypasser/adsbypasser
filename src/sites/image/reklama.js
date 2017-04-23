(function () {
  'use strict';

  function action (firstSelector, secondSelector) {
    $.removeNodes('iframe, #adblock_detect, .popupOverlay');

    var node = $.$(firstSelector);
    if (node) {
      // first pass
      _.wait(500).then(function () {
        node.removeAttribute('disabled');
        return _.wait(500);
      }).then(function () {
        // HACK some sites can not receive the click event without focus
        node.focus();
        // HACK some sites needs to click multiple times
        node.click();
        node.click();
        node.click();
      });
      return;
    }

    // second pass
    var i = $(secondSelector);
    $.openImage(i.src);
  }

  var defaultAction = _.P(action, '#continuetoimage > form input', 'img[class^=centred]');

  $.register({
    rule: [
      {
        host: [
          // com
          // starts with image
          /^image(ontime|corn|picsa|horse|decode)\.com$/,
          // ends with image
          /^(zonezeed|zelje|croft|myhot|bok|hostur|greasy|dam)image\.com$/,
          // starts with img
          /^img(icy|next|savvy|\.spicyzilla|twyti|xyz|devil|tzar|ban|pu|beer|wet|tornado|kicks|-pay|nimz|binbou|2share|22|cover|hit|main|trial|blank|-uploads|reputa|fapper)\.com$/,
          // starts with img-
          /^img-(zone|planet)\.com$/,
          // starts with www
          /^www\.img(blow|lemon|4sharing)\.com$/,
          /^www\.imagefolks\.com$/,
          /^www\.freephotohostin\.com$/,
          /^www\.hotimage\.uk$/,
          // starts with xxx
          /^xxx(imagenow|screens)\.com$/,
          // else
          /^(playimg|picstwist|ericsony|wpc8|uplimg|lexiit|thumbnailus|newimagepost|fapingpics|dimtus|tinizo)\.com$/,
          /^((i|hentai)\.)?imgslip\.com$/,
          /^(i|xxx)\.hentaiyoutube\.com$/,
          /^(go|er)imge\.com$/,
          /^(like\.)?08lkk\.com$/,
          /^(www\.)?\.imgult\.com$/,
          /^nim(plus|zshare)\.com$/,
          /^nudeximg\.com$/,
          /imgseeds?\.com$/,
          /xxxsparrow?\.com$/,
          // net
          /^img(serve|coin|fap|candy|master|-view|run|boom|project|python|pics|pix)\.net$/,
          /^(imagesouls|naughtygate|gallerycloud|imagelaser|picture-bang|project-photo|pix-link|funimg|golfpit|xximg)\.net$/,
          // org
          /^(shot|adult)img\.org$/,
          /^img(studio|spot)\.org$/,
          /^image(\.adlock|on|team)\.org$/,
          /^(voyeur|drag|teen|mega)image\.org$/,
          /^teenshot\.org$/,
          // else
          /^(hotimages|55888)\.eu$/,
          /^img(cloud|mag)\.co$/,
          /^pixup\.us$/,
          /^(bulkimg|photo-up|myimg|pop-img|img-pop|ads-img)\.info$/,
          /^vava\.in$/,
          /^(pixxx|picspornfree|imgload|fapat)\.me$/,
          /^(domaink|pic2pic|porno-pirat|24avarii|loftlm|18pron|imgplus)\.ru$/,
          /^imgease\.re$/,
          /^goimg\.xyz$/,
          /^(pic2pic|picz)\.site$/,
          /^darpix\.ga$/,
          /^sxpics\.nl$/,
          /^darpix\.desi$/,
          /^pic4you\.top$/,
          /^imgsen\.se$/,
          /^ipicture\.su$/,
        ],
        path: /^\/img-.*\.html/,
      },
      {
        host: [
          /^img(run|twyti)\.net$/,
          /^imgtwyti\.com$/,
          /^hentai-(pop|baka)\.com$/,
          /^star-hentai\.com$/,
          /^(jav|img)-hentai\.host$/,
          /^hentai-king\.host$/,
          /^img-king\.xyz$/,
        ],
        path: /^\/[ti]\/img-.*\.html/,
      },
      {
        host: /^imgking\.co$/,
        path: /^\/img4?-.*\.html/,
      },
      {
        host: /^imgbb\.net$/,
        path: /^\/.-.+$/,
      },
      {
        host: /^cdn\.javtotal\.com$/,
        path: /^\/img\/.+$/,
      },
      {
        host: /^imgtor\.pw$/,
        path: /^\/img2\/.+$/,
      },
      {
        host: /^ima\.gy$/,
        path: /^\/i\/.+$/,
      },
    ],
    ready: defaultAction,
  });

  $.register({
    rule: {
        host: /^imgtor\.pw$/,
        path: /^\/img\/.*$/,
    },
    start: function (m) {
      var imageUrl = 'http://' + m.host[0] + m.path[0].replace("img","img2");
      $.openLink(imageUrl);
    },
  });

  $.register({
    rule: {
      host: /^imgrat\.com$/,
      path: /^\/img-.*\.html/,
    },
    ready: _.P(action, '#close', '#main_image img.center-block.img-responsive'),
  });

  $.register({
    rule: {
      host: [
        /^imageporn\.eu$/,
        /^imgzizi\.xyz$/,
      ],
      path: /^\/img-.*\.html/,
    },
    start: function () {
      // HACK break script injection
      $.window.document.createElement = null;
    },
    ready: defaultAction,
  });

  // TODO need to refactor the cookie rule
  $.register({
    rule: {
      host: [
        /^www\.img(adult|wallet)\.com$/,
        /^www\.imgdrive\.net$/,
        /^(www\.)?imgtaxi\.com$/,
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

  $.register({
    rule: [
      {
        host: /^imgking\.co$/,
        path: /^\/imgs-.*\.html/,
      },
      {
        host: [
          /^img(kings|prime)\.com$/,
          /^imagerar\.com$/,
        ],
        path: /^\/img-.*\.html/,
      },
    ],
    ready: function () {
      var url = $.window.linkid;
      $.openImage(url);
    },
  });

  $.register({
    rule: {
      host: /^imgkings\.com$/,
      path: /^\/img2-.*\.html/,
    },
    ready: defaultAction,
  });

  $.register({
    rule: [
      {
        host: /^imagerar\.com$/,
        path: /^\/img2-/,
      },
      {
        host: /^imgking\.co$/,
        path: /^\/img[v3]-.*\.html/,
      },
      {
        host: /^imgprime\.com$/,
        path: /^\/img3-.*\.html$/,
      },
    ],
    ready: function () {
      var i = $('img[alt]');
      $.openImage(i.src);
    },
  });

  $.register({
    rule: {
      host: /^img\.yt$/,
      path: /^\/img-.*\.html/,
    },
    ready: _.P(action, '#continuebutton, #continuetoimage input[type="submit"]', 'img[class^=centred]'),
  });

})();
