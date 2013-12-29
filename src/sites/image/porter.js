(function () {
  'use strict';

  function run () {
    var o = $('#download_box img');
    $.openImage(o.src);
  }

  $.register({
    rule: {
      host: /^www\.imageporter\.com$/,
      path: /^\/\w{12}\/.*\.html$/,
    },
    ready: run,
  });

  $.register({
    rule: {
      host: /^(www\.)?(imagecarry|imagedunk|imageporter|imageswitch|picleet|picturedip|pictureturn|pixroute)\.com|(piclambo|yankoimages)\.net$/,
    },
    ready: run,
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
