// ==UserScript==
// @match          http://bilder.nixhelp.de/viewer.php?*
// @match          http://dwimg.com/viewer.php?file=*
// @match          http://freeuploadimages.org/viewer.php?file=*
// @match          http://gallery.jpavgod.com/viewer.php?file=*
// @match          http://hentai-hosting.com/viewer.php?file=*
// @match          http://howtohemorrhoidscure.com/viewer.php?file=*
// @match          http://imagecurl.com/viewer.php?file=*
// @match          http://imagecurl.org/viewer.php?file=*
// @match          http://imagepremium.com/viewer.php?file=*
// @match          http://javimage.us/viewer.php?file=*
// @match          http://miragepics.com/viewer.php?file=*
// @match          http://pornpicuploader.com/viewer.php?file=*
// @match          http://preview.jpavgod.com/*.html
// @match          http://shareimage.ro/viewer.php?file=*
// ==/UserScript==

// mihalism v1
$.register({
  rule: {
    host: /(pornpicuploader|imagepremium|hentai-hosting|gallery\.jpavgod|miragepics)\.com|freeuploadimages\.org|shareimage\.ro|bilder\.nixhelp\.de|imagecurl\.(com|org)/,
    query: /file=([^&]+)/,
  },
  run: function (m) {
    'use strict';

    $.redirect('/images/' + m.query[1]);
  },
});

// mihalism v2
$.register({
  rule: {
    host: /howtohemorrhoidscure\.com|javimage\.us/,
  },
  run: function () {
    'use strict';

    var a = $('#page_body a');
    var s = a.href;
    // the real link is diffirent from original host
    a = s.lastIndexOf('http://');
    if (a >= 0) {
      $.redirect(s.substr(a));
    }
  },
});

// preview.jpavgod.com
$.register({
  rule: {
    host: /preview\.jpavgod\.com/,
  },
  run: function () {
    'use strict';

    var i = $('#page_body div.text_align_center img');
    $.redirect(i.src);
  },
});

// dwimg.com
$.register({
  rule: {
    host: /dwimg\.com/,
    query: /file=([^&]+)/,
  },
  run: function (m) {
    'use strict';

    $.redirect('/files/' + m.query[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
