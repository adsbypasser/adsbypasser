$.register({
  rule: {
    host: /^(www\.)?cvc\.la$/,
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';

    // second stage
    var matches = $.searchScripts(/window\.location\.replace\('([^']+)'\);/);
    if (matches) {
      $.openLink(matches[1]);
      return;
    }

    // first stage
    matches = $.searchScripts(/<input type='hidden' name='hidden' value='(\d+)'>/);
    $.openLinkByPost(document.location.href, {
      hidden: matches[1],
      image: ' ',
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
