$.register({
  rule: {
    host: /^www\.4shared\.com$/,
    path: /^\/(mp3|get|rar|zip|file|android|software|program)\//,
  },
  ready: function () {
    'use strict';

    $.get('http://www.4server.info/find.php', {
      data: window.location.href,
    }, function (data) {
      var d = $.toDOM(data);
      var c = $('meta[http-equiv=refresh]', d);
      var b = c.content.match(/URL=(.+)$/);
      var a = b[1];

      $.openLink(a);
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
