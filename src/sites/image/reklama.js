(function () {
  'use strict';

  function ready () {
    var i = $('img[class^=centred]');
    $.openImage(i.src);
  }

  $.register({
    rule: {
      host: /^(image(decode|ontime)|(zonezeed|zelje|croft|myhot|dam)image|img-zone)\.com|(img(serve|coin|fap)|gallerycloud)\.net|hotimages\.eu|imgskull\.info|(imgstudio|dragimage)\.org$/,
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

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
