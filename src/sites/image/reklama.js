(function () {
  'use strict';

  function ready () {
    var i = $('img[class^=centred]');
    $.openImage(i.src);
  }

  $.register({
    rule: {
      host: [
        /^(image(decode|ontime)|(zonezeed|zelje|croft|myhot|dam)image|pic(\.apollon-fervor|stwist)|www\.imglemon)\.com$/,
        /^(img(serve|coin|fap)|gallerycloud)\.net$/,
        /^hotimages\.eu$/,
        /^(imgstudio|dragimage)\.org$/,
      ],
      path: /^\/img-.*\.html$/,
    },
    ready: ready,
  });

  $.register({
    rule: 'http://www.imgadult.com/img-*.html',
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

  $.register({
    rule: {
      host: /^08lkk\.com$/,
      path: /^\/Photo\/img-.+\.html$/,
    },
    start: function () {
      // this site checks cookie that caculate from session
      // do an AJAX to skip checking
      $.get(window.location.toString(), {}, function (data) {
        var a = $.toDOM(data);
        var i = $('img[class^=centred]', a);
        $.openImage(i.src);
      });
    },
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
