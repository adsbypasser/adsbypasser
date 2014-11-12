$.register({
  rule: {
    host: /^(www\.)?clictune\.com$/,
    path: /^\/id=\d+/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var linkHolder = $('#compteur');
    var matches = linkHolder.innerHTML.match(/<a href=".*url=([^&"]+).*>/);
    var url = decodeURIComponent(matches[1]);
    
    $.openLink(url);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
