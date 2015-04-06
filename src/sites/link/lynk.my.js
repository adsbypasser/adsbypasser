$.register({
  rule: {
    host: /^lynk\.my$/,
  },
  ready: function () {
    'use strict';

    var i = setInterval(function () {
      var a = $.$('#continueButton a', window.frames[0].document);
      if (!a) {
        return;
      }
      clearInterval(i);
      $.openLink(a.href);
    }, 100);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
