$.register({
  rule: {
    host: /^www\.adultf\.ly$/,
    path: /\/(.+)/,
  },
  ready: function (m) {
    'use strict';

    var i = $('#iframeID');
    var advID = i.dataset.cmp;
    var u = i.dataset.u;
    $.removeNodes('iframe');
    unsafeWindow.$ = null;

    function fetch () {
      $.post('/ajax/r.php', {
        advID: advID,
        page: m.path[1],
        u: u,
      }, function (data) {
        if (/^\d+/.test(data)) {
          fetch();
          return;
        }
        var m = data.match(/href="([^"]+)"/);
        m = m[1];
        $.openLink(m);
      });
    }
    fetch();
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
