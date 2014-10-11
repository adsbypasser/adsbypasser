$.register({
  rule: {
    host: /^steamcommunity\.com$/,
    path: /^\/linkfilter\/(.+)?$/,
    query: /^(?:\?url=(.+))?$/,
  },
  ready: function (m) {
    'use strict';

    // Sometimes, the URL is directly appended after the path (but the query of this URL is indocument.location.search)
    // Otherwise, the URL is entirely in the query
    var target = m.path[1]? m.path[1]+document.location.search : m.query[1];
    $.openLink(target);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
