(function () {
  'use strict';

  function run () {
    var i = $('#img_obj');
    $.redirect(i.src);
  }

  $.register({
    rule: 'http://fotoo.pl/show.php?img=*.html',
    run: run,
  });

  $.register({
    rule: {
      host: /^www\.(fotoszok\.pl|hornyimage|imagestime)\.com$/,
      path: /^\/show\.php\/.*\.html$/,
    },
    run: run,
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
