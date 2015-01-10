$.register({
  rule: {
    host: /^(www\.)?safelinkconverter2\.com$/,
    path: /^\/decrypt-\d\/$/,
    query: /id=(\w+=+)/,
  },
  start: function (m) {
    'use strict';

    $.get('https://decrypt.safelinkconverter.com/index.php' + window.location.search).then(function (html) {
      var m = html.match(/3;URL=([^"]+)/);
      if (!m) {
        _.warn('pattern changed');
        return;
      }
      $.openLink(m[1]);
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
