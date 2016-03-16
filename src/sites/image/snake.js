(function () {
  'use strict';

  // first stage
  $.register({
    rule: {
      host: /^www\.imagesnake\.com$/,
      path: /^\/show\.php$/,
      query: /^\?/,
    },
    ready: run,
  });

  // second stage
  function run () {
    var i = $('#img_obj');
    $.openImage(i.src);
  }
  $.register({
    rule: {
      host: /^www\.(freebunker|imgcarry)\.com$/,
      path: /^\/show\//,
    },
    ready: run,
  });
  $.register({
    rule: {
      host: /^www\.(imagesnake|imagefruit)\.com$/,
      path: /^\/(img|show)\/.+/,
    },
    ready: run,
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
