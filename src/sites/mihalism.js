// ==UserScript==
// ==Mihalism Multi Host v1==
// @match          http://freeuploadimages.org/viewer.php?file=*
// @match          http://gallery.jpavgod.com/viewer.php?file=*
// @match          http://hentai-hosting.com/viewer.php?file=*
// @match          http://imagepremium.com/viewer.php?file=*
// @match          http://miragepics.com/viewer.php?file=*
// @match          http://pornpicuploader.com/viewer.php?file=*
// @match          http://shareimage.ro/viewer.php?file=*
// ==/Mihalism Multi Host v1==
// ==Mihalism Multi Host==
// @match          http://howtohemorrhoidscure.com/viewer.php?file=*
// @match          http://preview.jpavgod.com/*.html
// ==/Mihalism Multi Host==
// ==/UserScript==

(function () {
  'use strict';


  // mihalism v1
  $.register({
    rule: {
      host: /(pornpicuploader|imagepremium|hentai-hosting|gallery\.jpavgod|miragepics)\.com|freeuploadimages\.org|shareimage\.ro/,
    },
    run: function () {
      var uri = window.location.href.toString();
      uri = uri.replace('viewer.php?file=', 'images/');
      $.redirect(uri);
    },
  });

  // howtohemorrhoidscure.com
  $.register({
    rule: {
      host: /howtohemorrhoidscure\.com/,
    },
    run: function () {
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
      var i = $('#page_body div.text_align_center img');
      $.redirect(i.src);
    },
  });


})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
