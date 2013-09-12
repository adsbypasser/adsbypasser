// ==UserScript==
// @match          http://imagecorn.com/img-*.html
// @match          http://imagepicsa.com/img-*.html
// @match          http://imgboo.me/img-*.html
// @match          http://imgcandy.net/img-*.html
// @match          http://imgcloud.co/img-*.html
// @match          http://imgcorn.com/img-*.html
// @match          http://imgmoney.com/img-*.html
// @match          http://imgonion.com/img-*.html
// @match          http://imgpay.me/img-*.html
// @match          http://imgrill.com/img-*.html
// @match          http://imgtube.net/img-*.html
// @match          http://pixup.us/img-*.html
// @match          http://www.imagefolks.com/img-*.html
// ==/UserScript==

$.register({
  rule: {
    host: /^(img(onion|rill|money|corn)|image(corn|picsa)|www\.imagefolks)\.com|img(candy|tube)\.net|imgcloud\.co|pixup\.us|img(boo|pay)\.me$/,
  },
  run: function () {
    'use strict';

    var node = $.$('#continuetoimage > form input');
    if (node) {
      // first pass
      node.click();
      return;
    }

    // second pass
    var o = $('img[alt="image"]');
    $.redirect(o.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
