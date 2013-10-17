(function () {
  'use strict';

  $.register({
    rule: 'http://ddp.net/*',
    ready: function () {
      $.removeNodes('iframe');

      var s = unsafeWindow.golink.toString();
      var m = s.match(/src='(.+)'/);
      m = m[1];
      $.openLink(m);
    },
  });

})();


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
