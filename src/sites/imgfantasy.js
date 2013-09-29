// ==UserScript==
// @include        /http://imgfantasy\.com/\?[pv]=.+/
// @include        /http://imagedomino\.com/\?[pv]=.+/
// ==/UserScript==

(function () {
  'use strict';

  var host = /^(imgfantasy|imagedomino)\.com$/;

  $.register({
    rule: {
      host: host,
      query: /^\?p=/,
    },
    run: function () {
      var i = $('#container-home img');
      $.redirect(i.src);
    },
  });

  $.register({
    rule: {
      host: host,
      query: /^\?v=/,
    },
    run: function () {
      if (unsafeWindow.confirmAge) {
        unsafeWindow.confirmAge(1);
        return;
      }
      var i = $('#container-home img');
      $.redirect(i.src);
    },
  });
})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
