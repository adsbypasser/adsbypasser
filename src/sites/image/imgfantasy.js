(function () {
  'use strict';

  function helper (doReplace) {
    if ($.window.confirmAge) {
      $.window.confirmAge(1);
      return;
    }
    var i = $('#container-home img[onclick]');
    $.openImage(i.src, {
      replace: doReplace,
    });
  }

  $.register({
    rule: {
      host: [
        /^img(fantasy|leech|\.pornleech|smile|nemo|sense)\.com$/,
        /^(imagedomino|lovechix)\.com$/,
        /^0img\.net$/,
        /^daily-img\.com$/,
        /^picangel\.in$/,
        /^imagebic\.com$/,
        /^bunnyforum\.org$/,
      ],
      query: /^\?[pv]=/,
    },
    ready: _.P(helper, false),
  });

  $.register({
    rule: {
      host: /^imgsay\.com$/,
      query: /^\?[pv]=/,
    },
    ready: _.P(helper, true),
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
