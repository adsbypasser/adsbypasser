(function () {
  'use strict';

  function handler () {
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
    var o = $('img[alt="image"]');
    $.openImage(o.src);
  }

  $.register({
    rule: {
      host: [
        /^(img(rill|next|savvy|\.spicyzilla|twyti|xyz)|image(corn|picsa)|www\.(imagefolks|imgblow)|hosturimage|img-zone|08lkk)\.com$/,
        /^img(candy|master|-view|run)\.net$/,
        /^imgcloud\.co|pixup\.us$/,
        /^(www\.)?\.imgult\.com$/,
        /^bulkimg\.info$/,
        /^(image\.adlock|imgspot|teenshot)\.org$/,
        /^img\.yt$/,
        /^vava\.in$/,
        /^55888\.eu$/,
        /^pixxx\.me$/,
      ],
      path: /^\/img-.*\.html$/,
    },
    ready: handler,
  });

  $.register({
    rule: {
      host: /^imgking\.co$/,
      path: /^\/img-.*\.htmls$/,
    },
    ready: handler,
  });

  $.register({
    rule: {
      host: /^08lkk\.com$/,
      path: /^\/\d+\/img-.*\.html$/,
    },
    start: function () {
      // crack the shitty qqc.co visitScript 5440
      unsafeWindow.setTimeout = $.inject(_.nop);

      // this site checks cookie that caculate from session
      // do an AJAX to skip checking
      $.get(window.location.toString()).then(function (data) {
        var a = $.toDOM(data);

        var bbcode = $.$('#imagecodes input', a);
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
