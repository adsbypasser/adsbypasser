$.register({
  rule: {
    host: [
      /^img(fantasy|leech|\.pornleech|smile|say|nemo|sense)\.com$/,
      /^(imagedomino|lovechix)\.com$/,
      /^imageporn\.eu$/,
      /^0img\.net$/,
      /^daily-img\.com$/,
      /^picangel\.in$/,
    ],
    query: /^\?[pv]=/,
  },
  ready: function () {
    'use strict';

    if ($.window.confirmAge) {
      $.window.confirmAge(1);
      return;
    }
    var i = $('#container-home img[onclick]');
    $.openImage(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
