$.register({
  rule: [
    {
      host: /^(www\.)?(link\.)?safelink(converter2?|review)\.com$/,
      query: /id=(\w+=*)/,
    },
    {
      host: /^(www\.)?dlneko\.com$/,
      query: /go=(\w+=*)/,
    },
  ],
  start: function (m) {
    'use strict';

    var l = atob(m.query[1]);
    $.openLink(l);
  },
});

$.register({
  rule: {
    host: /^(www\.)?safelinkreview\.com$/,
    path: /^\/\w+\/cost\/([\w\.]+)\/?$/,
  },
  start: function (m) {
    'use strict';

    var l = 'http://' + m.path[1];
    $.openLink(l);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
