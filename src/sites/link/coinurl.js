(function () {
  'use strict';

  function deep (d) {
    d.addEventListener('DOMContentLoaded', function () {
      var a = $.$('#skip-ad', d.document);
      if (a) {
        $.openLink(a.href);
      }
    });
  }

  $.register({
    rule: {
      host: /^coinurl\.com|cur\.lv$/,
    },
    ready: function () {
      var d = unsafeWindow.frames[0];
      if (d) {
        deep(d);
        return;
      }
      var o = new MutationObserver(function (mutations) {
        o.disconnect();
        var d = unsafeWindow.frames[0];
        d.addEventListener('DOMContentLoaded', function () {
          d = d.frames[0];
          deep(d);
        });
      });
      o.observe(document.body, {
        childList: true,
      });
    },
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
