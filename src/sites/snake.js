(function () {
  'use strict';

  // first stage
  $.register({
    rule: {
      host: /^www\.imagesnake\.com$/,
      path: /^\/index\.php$/,
      query: /^\?/,
    },
    run: function () {
      var a = $('#tablewraper a:nth-child(2)');
      $.redirect(a.href);
    },
  });

  // second stage
  function run () {
    var i = $('#img_obj');
    $.redirect(i.src);
  }
  $.register({
    rule: {
      host: /^www\.(imagesnake|freebunker)\.com$/,
      path: /^\/show\//,
    },
    run: run,
  });
  $.register({
    rule: {
      host: /^www\.imagefruit\.com$/,
      path: /^\/(img|show)\/.+/,
    },
    run: run,
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
