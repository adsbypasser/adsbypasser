// ==UserScript==
// @match          http://comicalpic.net/img-*.html
// @match          http://croftimage.com/img-*.html
// @match          http://gallerycloud.net/img-*.html
// @match          http://hotimages.eu/img-*.html
// @match          http://imagedecode.com/img-*.html
// @match          http://imgserve.net/img-*.html
// @match          http://zeljeimage.com/img-*.html
// @match          http://zonezeedimage.com/img-*.html
// ==/UserScript==

$.register({
  rule: {
    host: /^(imagedecode|zonezeedimage|zeljeimage|croftimage)\.com|(comicalpic|imgserve|gallerycloud)\.net|hotimages\.eu$/,
  },
  run: function () {
    'use strict';

    var o = $('img[class^=centred]');
    $.redirect(o.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
