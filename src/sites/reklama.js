// ==UserScript==
// @match          http://comicalpic.net/img-*.html
// @match          http://croftimage.com/img-*.html
// @match          http://hosterbin.com/img-*.html
// @match          http://image.torrentjav.net/img-*.html
// @match          http://imagedecode.com/img-*.html
// @match          http://imgserve.net/img-*.html
// @match          http://ligasampiona.com/img-*.html
// @match          http://zeljeimage.com/img-*.html
// @match          http://zonezeedimage.com/img-*.html
// ==/UserScript==

(function () {
  'use strict';

  $register({
    rule: {
      host: /(imagedecode|zonezeedimage|zeljeimage|ligasampiona|hosterbin|croftimage)\.com|(comicalpic|image\.torrentjav|imgserve)\.net/,
    },
    run: function () {
      var o = $('#container img[class^=centred]');
      $redirect(o.src);
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
