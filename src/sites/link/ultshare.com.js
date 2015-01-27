$.register({
  rule: {
    host: /^(www\.)?ultshare\.com$/,
    path: /^\/(?:(?:\d-)?(\d+)|index\.php)$/,
    query: /^(?:\?a=\d&c=(\d+))?$/
  },
  start: function (m) {
    'use strict';

    // The id of the link is either in the path or in the query
    var linkId = m.path[1]?m.path[1]:m.query[1];

    // Bypass all interstitial pages, cookie check is only made on page 1 and 2 :)
    var directLink = '/3-' + linkId;

    $.openLink(directLink);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;