(function () {
  'use strict';

  function run () {
    var i = $('img.pic');
    $.replace(i.src);
  }

  $.register({
    rule: {
      host: /^imagenpic\.com$/,
      path: /^\/.*\/.+\.html$/,
    },
    run: run,
  });

  $.register({
    rule: {
      host: /^image(twist|cherry)\.com|imgpo\.st$/,
    },
    run: run,
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
