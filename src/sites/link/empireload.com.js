$.register({
  rule: {
    host: /empireload\.com$/,
    path: /^\/plugin\.php$/,
    query: /^\?id=linkout&url=([^&]+)$/,
  },
  start: function (m) {
    // _.info(m.query[1]);
    $.openLink(m.query[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
