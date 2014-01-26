(function () {
  'use strict';

  function run () {
    // dirty hack
    unsafeWindow.$ = undefined;
    var i = $('img.pic');
    $.replace(i.src);
  }

  $.register({
    rule: {
      host: /^imagenpic\.com$/,
      path: /^\/.*\/.+\.html$/,
    },
    ready: run,
  });

  $.register({
    rule: {
      host: /^image(twist|cherry)\.com|xlocker\.net$/,
    },
    ready: run,
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
