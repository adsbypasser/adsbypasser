$.register({
  rule: {
    host: /^oxyl\.me$/,
  },
  ready: function () {
    'use strict';

    // If the list contains only one link
    var l = $.$$('.links-container.result-form > a.result-a');

    // If only one link, we redirect to it
    if (l.size() > 1) {
      return;
    }
    $.openLink(l.at(0).href);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
