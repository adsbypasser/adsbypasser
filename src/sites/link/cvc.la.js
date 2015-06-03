$.register({
  rule: {
    host: /^(www\.)?cvc\.la$/,
    path: /^\/\w+$/,
  },
  start: function () {
    'use strict';

    $.post(document.location.href, {
      hidden: 24, // Either 24 or 276, but both seem to work anyway
      image: ' ',
    }).then(function (text) {
      var matches = text.match(/window\.location\.replace\('([^']+)'\);/);
      $.openLink(matches[1]);
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
