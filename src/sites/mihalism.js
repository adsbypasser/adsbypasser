// ==UserScript==
// ==Mihalism Multi Host v1==
// @match          http://freeuploadimages.org/viewer.php?file=*
// @match          http://gallery.jpavgod.com/viewer.php?file=*
// @match          http://hentai-hosting.com/viewer.php?file=*
// @match          http://imagepremium.com/viewer.php?file=*
// @match          http://pornpicuploader.com/viewer.php?file=*
// @match          http://shareimage.ro/viewer.php?file=*
// ==/Mihalism Multi Host v1==
// ==Mihalism Multi Host v2==
// @match          http://image69.us/x/viewer.php?file=*
// @match          http://jpdown.info/viewer.php?file=*
// ==/Mihalism Multi Host v2==
// ==Mihalism Multi Host v3==
// @match          http://hentaita.com/viewer.php?file=*
// @match          http://howtohemorrhoidscure.com/viewer.php?file=*
// ==/Mihalism Multi Host v3==
// ==Mihalism Multi Host==
// @match          http://image69.us/viewer.php?file=*
// @match          http://preview.jpavgod.com/*.html
// ==/Mihalism Multi Host==
// ==/UserScript==

(function () {
  'use strict';


  // mihalism v1
  $register({
    rule: {
      host: /(pornpicuploader|imagepremium|hentai-hosting|gallery\.jpavgod)\.com|freeuploadimages\.org|shareimage\.ro/,
    },
    run: function () {
      var uri = window.location.href.toString();
      uri = uri.replace('viewer.php?file=', 'images/');
      $redirect(uri);
    },
  });

  // mihalism v2
  function v2 () {
    // for jpdown.info
    $removeNodes('#divExoLayerWrapper, #fadeinbox');

    var a = $('#page_body a');
    $redirect(a.href);
  }
  $register({
    rule: {
      host: /jpdown\.info/,
    },
    run: v2,
  });
  $register({
    rule: {
      host: /image69\.us/,
      path: /\/x\/.+/,
    },
    run: v2,
  });

  // mihalism v3
  $register({
    rule: {
      host: /hentaita\.com|howtohemorrhoidscure\.com/,
    },
    run: function () {
      var a = $('#page_body a');
      var s = a.href;
      // the real link is diffirent from original host
      a = s.lastIndexOf('http://');
      if (a >= 0) {
        $redirect(s.substr(a));
      }
    },
  });

  // image69
  $register({
    rule: {
      host: /image69\.us/,
    },
    run: function (m) {
      var a = $('#page_body .text_align_center a');
      var s = a.href;
      // the real link does not immediately appears after http://
      a = s.lastIndexOf(m.host[0]);
      $redirect('http://' + s.substr(a));
    },
  });

  // preview.jpavgod.com
  $register({
    rule: {
      host: /preview\.jpavgod\.com/,
    },
    run: function () {
      var i = $('#page_body div.text_align_center img');
      $redirect(i.src);
    },
  });


})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
