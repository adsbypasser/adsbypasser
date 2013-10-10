// ==UserScript==
// @match          http://fotoo.pl/show.php?img=*.html
// @match          http://www.fotoszok.pl/show.php/*.html
// @match          http://www.hornyimage.com/show.php/*.html
// @match          http://www.imagestime.com/show.php/*.html
// ==/UserScript==

$.register({
  rule: {
    host: /^fotoo\.pl|www\.(fotoszok\.pl|hornyimage|imagestime)\.com$/,
  },
  ready: function () {
    'use strict';

    var i = $('#img_obj');
    $.openImage(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
